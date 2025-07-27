const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  setTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'running', 'completed'],
    default: 'pending'
  },
  startedAt: {
    type: Date,
    default: null
  },
  stoppedAt: {
    type: Date,
    default: null
  },
  actualTime: {
    type: String,
    default: '00:00:00'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
