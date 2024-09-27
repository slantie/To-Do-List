import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaskModal = ({ onClose, onAddTask, onEditTask, editingTask }) => {
  const [task, setTask] = useState({
    description: "",
    date: "",
    time: "",
    priority: "medium",
    tag: "pending",
    subTasks: [],
  });
  const [newSubTask, setNewSubTask] = useState("");

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      setTask((prevTask) => ({
        ...prevTask,
        subTasks: [
          ...prevTask.subTasks,
          { description: newSubTask, completed: false },
        ],
      }));
      setNewSubTask("");
    }
  };

  const handleRemoveSubTask = (index) => {
    setTask((prevTask) => ({
      ...prevTask,
      subTasks: prevTask.subTasks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onEditTask(task);
    } else {
      onAddTask(task);
    }
  };

  return (
    <motion.div
      className="relative p-8 border w-full max-w-md shadow-lg rounded-md bg-white"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative p-8 border w-full max-w-md shadow-lg rounded-md bg-white">
          <h3 className="text-2xl font-bold mb-6">
            {editingTask ? "Edit Task" : "Create New Task"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Task Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={task.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={task.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={task.time}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="tag"
                  name="tag"
                  value={task.tag}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="subTasks"
                className="block text-sm font-medium text-gray-700"
              >
                Subtasks
              </label>
              <div className="flex mt-1">
                <input
                  type="text"
                  value={newSubTask}
                  onChange={(e) => setNewSubTask(e.target.value)}
                  placeholder="Add a subtask"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddSubTask}
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2 space-y-2">
                {task.subTasks.map((subTask, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{subTask.description}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubTask(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskModal;
