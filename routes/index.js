const express = require('express');
const router = express.Router();
const Todo = require('../models/Task'); // Adjust the path as necessary
// const upload = require('../middleware/upload');
const { ensureAuthenticated } = require('../config/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });




router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const tasks = await Todo.find({});
        res.render('index', { tasks: tasks });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/addtask', ensureAuthenticated, upload.single('image'), async (req, res) => {
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

router.put('/edit/:id', ensureAuthenticated, upload.single('image'), async (req, res) => {
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

router.post('/removetask', ensureAuthenticated, async (req, res) => {
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


module.exports = router;