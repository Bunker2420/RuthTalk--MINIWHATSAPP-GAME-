const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const SignUpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(value);
      },
      message: props => `${props.value} is not a valid Gmail address!`
    }
  }
});

SignUpSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', SignUpSchema);

module.exports = User;
