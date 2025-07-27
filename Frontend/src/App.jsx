import React, { useEffect, useState } from 'react';
import TaskForm from './components/taskform';
import TaskList from './components/tasklist';
import PastTasks from './components/pasttasks';
import { getTasks, updateTask as updateTaskApi, createTask, deleteTask } from './Api.js';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const tasksFromServer = await getTasks();
      setTasks(tasksFromServer || []);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setError('Failed to connect to the server. Please make sure the backend is running.');
      setTasks([]);
    }
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskUpdate = async (taskId, updateData) => {
    try {
      const updatedTask = await updateTaskApi(taskId, updateData);
      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? updatedTask : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      setError(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const activeTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="app-container">
      <header>
        <h1>Task Timer</h1>
      </header>
      <main>
        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}
        <TaskForm addTask={addTask} />
        <div className="active-tasks">
          <h2>Active Tasks</h2>
          <TaskList 
            tasks={activeTasks} 
            onUpdateTask={handleTaskUpdate}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        <div className="completed-tasks">
          <PastTasks 
            tasks={completedTasks}
            onDeleteTask={handleDeleteTask} 
          />
        </div>
      </main>
    </div>
  );
};

export default App;
