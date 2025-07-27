import React from 'react';
import './pasttasks.css';

const PastTasks = ({ tasks, onDeleteTask }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not started';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const completedTasks = tasks
    .filter(task => task.status === 'completed')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="past-tasks">
      <h2>Completed Tasks</h2>
      <div className="tasks-grid">
        {completedTasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3>{task.name}</h3>
              <button 
                className="delete-btn"
                onClick={() => onDeleteTask(task._id)}
              >
                Delete
              </button>
            </div>
            <div className="task-details">
              <div className="time-details">
                <div className="time-item">
                  <span className="label">Set Time:</span>
                  <span className="value">{task.setTime}</span>
                </div>
                <div className="time-item">
                  <span className="label">Actual Time:</span>
                  <span className="value">{task.actualTime}</span>
                </div>
              </div>
              <div className="date-details">
                <div className="date-item">
                  <span className="label">Started:</span>
                  <span className="value">{formatDate(task.startedAt)}</span>
                </div>
                <div className="date-item">
                  <span className="label">Completed:</span>
                  <span className="value">{formatDate(task.stoppedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {completedTasks.length === 0 && (
        <div className="no-tasks">
          No completed tasks yet
        </div>
      )}
    </div>
  );
};

export default PastTasks;
