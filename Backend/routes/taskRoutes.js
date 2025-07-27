const express = require("express");
const Task = require("../models/schema");
const router = express.Router();

router.get("/", async (req, res) => {// get all tasks
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {// create a new task
  try {
    const { name, setTime } = req.body;
    const newTask = new Task({ 
      name, 
      setTime,
      status: 'pending',
      startedAt: null,
      stoppedAt: null,
      actualTime: '00:00:00'
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/:id", async (req, res) => {// update a task
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    
    Object.assign(task, updates);// update task with the new data
    await task.save();
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {// delete a task
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
