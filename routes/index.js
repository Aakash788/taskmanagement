const Routes = require('express').Router();
const Todo = require('../models/task');
const multer = require('multer');
const path = require('path');

module.exports = Routes;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });
  
  // Image upload route
  Routes.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.json({ url: '/images/' + req.file.filename });
  });

// Routes
Routes.get('/',  async (req, res) => {
    const userId = req.user.id;
    try {
        const tasks = await Todo.find({ userId: userId });
        res.render('index', { tasks: tasks });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

Routes.post('/addtask', upload.single('image'), async(req, res) => {
    try {
        const userId = req.user.id;
        const newTask = new Todo({
            subject: req.body.subject,
            description: req.body.description,
            image: req.file ? req.file.filename : '',
            user: userId,
        });
        await newTask.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

  
Routes.get('/edit/:id', async (req, res) => {
    try {
        const task = await Todo.findById(req.params.id);
        res.render('edit', { task: task });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

Routes.put('/edit/:id',upload.single('image'), async (req, res) => {
    try {
        const updatedTask = {
            subject: req.body.subject,
            description: req.body.description,
            image: req.file ? req.file.filename : req.body.oldImage
        };
        await Todo.findByIdAndUpdate(req.params.id, updatedTask);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

Routes.post('/removetask', async (req, res) => {
    try {
        const taskId = req.body.taskId;
        console.log(`Attempting to remove task with ID: ${taskId}`);

        if (!taskId) {
            throw new Error('Task ID is required');
        }

        await Todo.findByIdAndDelete(taskId);
        console.log(`Task with ID: ${taskId} removed successfully`);
        res.redirect('/');
    } catch (err) {
        console.error('Error removing task:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

