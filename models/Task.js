const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    subject: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Todo', todoSchema);