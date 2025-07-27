import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = ({ task, onUpdateTask }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    const now = new Date();
    setStartTime(now);
    setIsRunning(true);
    onUpdateTask({
      status: 'running',
      startedAt: now.toISOString()
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    const endTime = new Date();
    onUpdateTask({
      status: 'completed',
      stoppedAt: endTime.toISOString(),
      actualTime: formatTime(elapsedTime),
      setTime: task.setTime,
      startedAt: startTime.toISOString()
    });
  };

  return (
    <div className="timer-container">
      <div className="timer-display">
        <div className="time-info">
          <div className="elapsed">Time: {formatTime(elapsedTime)}</div>
          <div className="set-time">Set Time: {task.setTime}</div>
        </div>
      </div>
      
      <div className="timer-controls">
        {!isRunning && !startTime && (
          <button className="timer-button start" onClick={handleStart}>
            Start
          </button>
        )}
        
        {isRunning && (
          <button className="timer-button stop" onClick={handleStop}>
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
