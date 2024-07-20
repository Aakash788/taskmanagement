const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  task: {
    subject: String,
    description: String,
    Image: String,
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
