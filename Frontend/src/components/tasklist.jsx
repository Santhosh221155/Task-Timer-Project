import React from 'react';
import Timer from './timer';
import './tasklist.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  // Only show non-completed tasks
  const activeTasks = tasks.filter(task => task.status !== 'completed');

  if (activeTasks.length === 0) {
    return (
      <div className="task-list empty">
        <p>No active tasks. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {activeTasks.map((task) => (
        <div key={task._id} className="task-item">
          <div className="task-header">
            <h3>{task.name}</h3>
            <div className="task-controls">
              <span className="task-status">{task.status}</span>
              <button 
                className="delete-btn"
                onClick={() => onDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <p className="task-time">Set Time: {task.setTime}</p>
          <Timer 
            task={task} 
            onUpdateTask={(updateData) => onUpdateTask(task._id, updateData)} 
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
