import React, { useState } from 'react';
import { createTask } from '../Api.js';
import './taskform.css';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!taskName.trim()) {
      setError('Please enter a task name');
      return false;
    }
    if (!taskTime) {
      setError('Please set a time');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const taskData = {
        name: taskName,
        setTime: taskTime,
        status: 'pending',
        startedAt: null,
        stoppedAt: null,
        actualTime: '00:00:00'
      };
      
      const newTask = await createTask(taskData);
      addTask(newTask);
      setTaskName('');
      setTaskTime('');
      setError('');
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="taskName">Task Name:</label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="taskTime">Set Time:</label>
          <input
            id="taskTime"
            type="time"
            step="1"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
