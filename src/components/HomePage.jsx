import React, { useState } from 'react';
import TaskCard from './TaskCard';

const HomePage = ({ tasks, onToggleTask, onDeleteTask, onUpdateTask, onOpenModal, onEditTask }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('time');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return task.tag === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'time') {
      return new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time);
    } else if (sortBy === 'priority') {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === 'deadline') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-24">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-bold mb-12 text-center text-blue-800">Task Manager</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <button 
            onClick={onOpenModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform transition hover:scale-105 duration-300 ease-in-out mb-4 md:mb-0"
          >
            Create New Task
          </button>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-blue-300 text-blue-800 py-3 px-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
            </select>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-blue-300 text-blue-800 py-3 px-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              <option value="time">Sort by Time</option>
              <option value="priority">Sort by Priority</option>
              <option value="deadline">Sort by Deadline</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
              onEdit={onEditTask}
            />
          ))}
        </div>
        {sortedTasks.length === 0 && (
          <p className="text-3xl text-center text-blue-600 mt-16">No tasks found for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;