# 🗨️ RuthTalk

**RuthTalk** is a real-time messaging platform designed to connect users instantly and allow them to chat with friends. Whether you're catching up with friends or sending a quick message, RuthTalk provides a seamless experience with instant message delivery, chat history, and smooth animations. This app also has games and a beautifully animated UI for an engaging user experience.

Built using Node.js, Express, MongoDB, and Socket.IO, RuthTalk brings chat and fun together in a modern and user-friendly interface.

Live Demo: [https://ruthtalk.onrender.com](https://ruthtalk.onrender.com)  

## 🚀 Features

### 💬 Real-time Chat
- One-on-one chat between registered users
- Chat persists even after logout
- Previously chatted contacts open the same thread
- Real-time updates using **Socket.io**

### 🔐 User Authentication
- Secure login & signup system
- Passwords are securely hashed using passport-local-mongoose during sign-up, ensuring users' passwords are not stored in plain text.

### 🕹️ Games
- Fun Games: Engage in 4 different games that you can play against the computer directly within the chat! 🎮
   - Rock Paper Scissors ✊✋✌️
   - Guessing Game 🎯
   - Dino Game 🦖
   - Tic-Tac-Toe 🟩❌
### About Games
**Games Included** 🎮
  **Rock Paper Scissors** ✊✋✌️
  Play the classic Rock, Paper, Scissors game against the computer. Choose your move and let the app determine the winner! It's quick, simple, and loads of fun.
  
  **Guessing Game** 🎯
  Test your guessing skills! Think of a number, and the computer will try to guess it within a set number of attempts. Can you beat the computer?
  
  **Dino Game** 🦖
  Remember the hidden Google Chrome Dinosaur game? Now you can play it against the computer! Dodge obstacles and try to run as long as you can. Challenge the computer for the highest score!
  
  **Tic-Tac-Toe** 🟩❌
  A classic game of Tic-Tac-Toe! Play against the computer in a battle of X's and O's, and claim victory by lining up three of your marks in a row, column, or diagonal.

### Game Instructions 🎮
  **Rock Paper Scissors**:
  
    -Players choose either Rock, Paper, or Scissors.
    
    -The computer randomly chooses its move and the app determines the winner based on the classic rules.
    
    -Players take turns and the winner is displayed.
  
  **Guessing Game**:
  
    -The player thinks of a number within a certain range (e.g., 1-100).
    
    -The computer will try to guess the number within a set number of attempts.
    
    -The app provides hints if the guess is too high or too low.
  
  **Dino Game**:
  
    -Players control a dinosaur to dodge obstacles.
    
    -The longer you run, the higher the score.
    
    -Challenge the computer for the highest score!
  
  **Tic-Tac-Toe**:
  
    -Players take turns placing X or O on a 3x3 grid.
    
    -The first player to align three marks horizontally, vertically, or diagonally wins the game.
    
    -It’s a battle of strategy against the computer!

### 🧠 Smart UI
- Flash messages for login/signup success or errors
- Responsive design
- Interactive elements with animations (AOS & CSS transitions)

---

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| **Node.js** | Backend runtime |
| **Express** | Server framework |
| **MongoDB Atlas** | Cloud-based database |
| **Mongoose** | MongoDB ODM |
| **EJS** | Templating engine |
| **Socket.io** | Real-time WebSocket communication |
| **Render** | Deployment |

---
## How to Contribute 🤝
-Fork the repository and create your own branch for changes.

-Submit a pull request with a clear explanation of the changes.

-Any ideas for new features or improvements are welcome! 💡

## A Special Thanks ✨
Thank you for checking out RuthTalk, and I hope you have a fantastic time chatting and playing games! 🚀💬🎮
