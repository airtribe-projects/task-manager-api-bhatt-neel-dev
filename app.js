const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load task data from task.json into memory
const taskData = require('./task.json');
let tasks = taskData.tasks;
let nextId = tasks.length + 1;

// Validation helper function
function validateTask(task) {
    if (!task.title || typeof task.title !== 'string') {
        return 'Title is required and must be a string';
    }
    if (!task.description || typeof task.description !== 'string') {
        return 'Description is required and must be a string';
    }
    if (typeof task.completed !== 'boolean') {
        return 'Completed must be a boolean';
    }
    return null;
}

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET /tasks/:id - Get a single task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    const validationError = validateTask(req.body);

    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    const newTask = {
        id: nextId++,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const validationError = validateTask(req.body);

    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    tasks[taskIndex] = {
        id: taskId,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed
    };

    res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task deleted successfully' });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;