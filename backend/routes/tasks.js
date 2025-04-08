const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const { auth, adminAuth } = require('../middleware/auth');

// Get all tasks (with filters based on user role)
router.get('/', auth, async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.find()
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email');
    } else {
      tasks = await Task.find({ assignedTo: req.user._id })
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email');
    }
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new task (admin only)
router.post('/',
  adminAuth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
    body('longDescription').trim().notEmpty().withMessage('Long description is required'),
  
    body('deadline').isISO8601().withMessage('Please enter a valid deadline with date and time'),

    body('assignedTo').isArray().withMessage('Assigned users must be an array')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, shortDescription, longDescription, deadline, assignedTo } = req.body;

      const task = new Task({
        title,
        shortDescription,
        longDescription,
        deadline,
        assignedTo,
        createdBy: req.user._id
      });

      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update task status (students only)
router.patch('/:id/status',
  auth,
  [
    body('status').isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await Task.findOne({
        _id: req.params.id,
        assignedTo: req.user._id
      });

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      task.status = req.body.status;
      await task.save();

      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update task (admin only)
router.put('/:id',
  adminAuth,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('shortDescription').optional().trim().notEmpty().withMessage('Short description cannot be empty'),
    body('longDescription').optional().trim().notEmpty().withMessage('Long description cannot be empty'),
    body('deadline').isISO8601().withMessage('Please enter a valid deadline with date and time'),
    body('assignedTo').optional().isArray().withMessage('Assigned users must be an array')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Update fields if provided
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          task[key] = req.body[key];
        }
      });

      await task.save();
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete task (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 