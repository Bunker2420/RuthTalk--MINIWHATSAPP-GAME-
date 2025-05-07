if(process.env.NODE_ENV != "production")
    {
        require('dotenv').config();
    }

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const session = require('express-session');   
const MongoStore = require('connect-mongo');              
const User = require('./models/Users.js');
const Message = require('./models/message.js');
const AppError = require('./Middleware/Error.js');
const flash = require('connect-flash');
const passport = require('passport');
const  LocalStrategy = require('passport-local');

DB_LINK = process.env.ATLAS_DB_URL;

const store = MongoStore.create({
    mongoUrl: DB_LINK,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 24 * 3600
  });

app.use(session({
    store:store, 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    name:"SessionId",
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        secure:false,
        httpOnly:true
    } 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 
app.use(flash());

app.set('view engine', 'ejs');

async function main() {
    await mongoose.connect(DB_LINK);
}
main()
  .then(() => console.log("Connection successful"))
  .catch(err => console.log(err));

  app.use(passport.initialize());
  // Integrating the passport with session to store the user
  app.use(passport.session());
  // IMPLEMENTING THE LOCAL STRATEGY
  passport.use(new LocalStrategy(User.authenticate()));
  // Serializing and deserializing the users
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success");
    res.locals.error_msg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get('/', (req, res) => {
    res.render('User/Login.ejs');
});

app.get('/SignUp', (req, res) => {
    try
    {
        res.render('User/SignUp.ejs');
    }
    catch(err)
    {
        next(err);
        throw new AppError(404,"Page not found");
    }  
});

app.post('/SignUp',async(req,res)=>{
    try{
       let username = req.body.username;
       let email = req.body.email;
       let password = req.body.password;
       let store = new User({
            email:email,
            username:username
        });
        let user = await User.register(store,password);
        console.log(user);
        res.render('User/Success.ejs',{username})
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(404,"Error while signup please enter correct data");
    }
});

app.get('/login', (req, res) => {
    res.render('User/Login.ejs');
});

app.post('/login', passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), async (req, res) => {
    try {
        req.session.username = req.user.username;  // safer than req.body
        req.flash("success", "You successfully logged in");
        res.redirect("/chat");
    } catch (err) {
        console.log("Login error:", err);
        req.flash("error", "Unexpected login error");
        res.redirect("/login");
    }
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.flash("error", "Please login first.");
    res.redirect("/login");
  }
  
  app.get('/chat', isLoggedIn, async (req, res) => {
    try
    {
        console.log(req.user);
        let users = await User.find({});
        users = users.filter(user => user.username !== res.locals.currUser.username);
        res.render('Home/chat.ejs', { users, username: req.session.username });
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(500,err.message);
    }
});


app.post('/chat', isLoggedIn,async (req, res) => {
    try
    {
        const senderUsername = req.session.username;
        const receiverUsername = req.body.receiverUsername;
    
        const users = await User.find({ username: { $ne: senderUsername } });
    
        res.render('chat', {
            username: senderUsername,
            receiverUsername: receiverUsername,
            users: users
        });
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(500,err.message);
    }
});

const gameRoute = require('./routes/games.js');
app.use('/games',gameRoute);

app.get('/chat/:username', isLoggedIn,async (req, res) => {
    console.log(req.user);
    const senderUsername = req.session.username;  // Get username from session
    const recusername = req.params.username;
    console.log(senderUsername);    

    try {
        let users = await User.find({});
        users = users.filter(user => user.username !== senderUsername);  // Filter out logged-in user

        let chatHistory = await Message.find({
            $or: [
                { Sender: senderUsername, Receiver: recusername },
                { Sender: recusername, Receiver: senderUsername }
            ]
        }).sort({ TimeStamp: 1 });

        // Render the chat page with the senderUsername passed to EJS
        res.render('Home/message.ejs', { senderUsername, recusername, users, chatHistory });
    } catch (err) {
        console.error(err);
        throw new AppError(404,"Page not found , Error loading chat");
    }
});
  // Make sure this is the correct path to your Mongoose model

  const userSocketMap = {}; // username -> socket.id

  io.on('connection', (socket) => {
      console.log('🟢 A user connected:', socket.id);
  
      // Save username inside the socket object
      socket.on('username', (username) => {
          console.log('📥 Received username:', username);
          socket.username = username;
      });
  
      // Map username to socket ID
      socket.on('register', (username) => {
          userSocketMap[username] = socket.id;
          console.log(`🧾 Registered ${username} with socket ID ${socket.id}`);
      });
  
      // Handle incoming message
      socket.on('sendMessage', async (data) => {
          const { sender, receiver, message, tempId } = data;
  
          const now = new Date();
  
          // Save the message to the DB
          const newMessage = new Message({
              Sender: sender,
              Receiver: receiver,
              message: message,
              status: 'sent',
              TimeStamp: now,
          });
  
          try {
              await newMessage.save();
  
              // Emit message to the receiver if they are online
              if (userSocketMap[receiver]) {
                  io.to(userSocketMap[receiver]).emit('receiveMessage', {
                      sender,
                      message,
                      TimeStamp: now,
                      status: 'sent',
                  });
              }
  
              // Send message status back to the sender (with tempId for tracking)
              if (userSocketMap[sender]) {
                  io.to(userSocketMap[sender]).emit('messageStatus', {
                      status: 'Message sent',
                      message,
                      TimeStamp: now,
                      tempId, // This should match the tempId from the client to identify the message
                  });
              }
          } catch (error) {
              console.error('Error saving message:', error);
              // Optionally send an error message to the sender if saving fails
              if (userSocketMap[sender]) {
                  io.to(userSocketMap[sender]).emit('messageStatus', {
                      status: 'Failed to send message',
                      message,
                      TimeStamp: now,
                      tempId,
                  });
              }
          }
      });
  
      // Clean up when the user disconnects
      socket.on('disconnect', () => {
          console.log('🔴 User disconnected:', socket.id);
          for (let username in userSocketMap) {
              if (userSocketMap[username] === socket.id) {
                  delete userSocketMap[username];
                  console.log(`🧾 Removed ${username} from userSocketMap`);
                  break;
              }
          }
      });
  });


  app.get('/logout',async(req,res,next)=>{
    try
    {
        req.logout((err)=>{
            if(err) {
               return next(err);
            }
            req.flash("success","You successfully logged out");
            res.redirect('/login')
        });
    }
    catch(err)
    {
        console.log(err);
        throw new AppError(500,err.message);
    }
});


  app.use((err,req,res,next)=>{
    let {status=500,message="Error occured"}=err;
    res.status(status).render('Loginerror.ejs',{status,message});
  });
// Start server
server.listen(3000, () => {
    console.log('🚀 Server is running at http://localhost:3000');
});