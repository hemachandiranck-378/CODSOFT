import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get tasks for a specific project
router.get('/project/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    project: req.body.project,
    assignee: req.body.assignee,
    deadline: req.body.deadline,
    status: req.body.status || 'To Do',
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task (e.g., status, assignee)
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.body.title) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.assignee) task.assignee = req.body.assignee;
    if (req.body.deadline) task.deadline = req.body.deadline;
    if (req.body.status) task.status = req.body.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
