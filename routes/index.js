const Routes = require('express').Router();
const Todo = require('../models/task');
// const upload = require('../middleware/upload');
const upload = require('../middleware/upload');

module.exports = Routes;
// Routes
Routes.get('/',  async (req, res) => {
    try {
        const tasks = await Todo.find({});
        res.render('index', { tasks: tasks });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

Routes.post('/addtask', upload, async(req, res) => {
    try {
        const newTask = new Todo({
            subject: req.body.subject,
            description: req.body.description,
            image: req.file ? req.file.filename : ''
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

Routes.put('/edit/:id', upload, async (req, res) => {
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

