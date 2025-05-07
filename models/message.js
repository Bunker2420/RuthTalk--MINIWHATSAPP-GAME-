const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    Sender:{
        type:String,
        required:true
    },
    Receiver:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    TimeStamp:{
        type:Date,
        default:Date.now
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent'
    }
});

const Message = new mongoose.model('Message',messageSchema);

module.exports = Message;