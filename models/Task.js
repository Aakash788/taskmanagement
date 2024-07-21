const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    subject: String,
    description: String,
    image: String,
    completed: {
        type: Boolean,
        default: false
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    
});

module.exports = mongoose.model('Todo', todoSchema);