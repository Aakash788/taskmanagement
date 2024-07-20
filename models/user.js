// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


UserSchema.add({
  Todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }
});

module.exports = mongoose.model('User', UserSchema);
