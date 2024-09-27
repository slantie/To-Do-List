import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaskCard = ({ task, onToggle, onDelete, onUpdate, onEdit }) => {
  const [showSubTasks, setShowSubTasks] = useState(false);

  const subTasksVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="form-checkbox h-6 w-6 text-blue-600"
        />
        <h2
          className={`text-2xl font-semibold flex-grow ml-4 ${
            task.completed ? "line-through text-gray-500" : "text-blue-800"
          }`}
        >
          {task.description}
        </h2>
        <button
          onClick={() => onEdit(task)}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="text-lg text-blue-600 mb-4">
        Due: {task.date} at {task.time}
      </div>
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            task.priority === "low"
              ? "bg-blue-100 text-blue-800"
              : task.priority === "medium"
              ? "bg-blue-200 text-blue-800"
              : "bg-blue-300 text-blue-800"
          }`}
        >
          {task.priority}
        </span>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            task.tag === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : task.tag === "ongoing"
              ? "bg-green-200 text-green-800"
              : "bg-blue-200 text-blue-800"
          }`}
        >
          {task.tag}
        </span>
      </div>
      <button
        onClick={() => setShowSubTasks(!showSubTasks)}
        className="text-blue-600 hover:text-blue-800"
      >
        {showSubTasks ? "Hide Subtasks" : "Show Subtasks"}
      </button>
      <AnimatePresence>
        {showSubTasks && (
          <motion.ul
            className="mt-2 space-y-1 text-sm"
            variants={subTasksVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {task.subTasks.map((subTask, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <input
                  type="checkbox"
                  checked={subTask.completed}
                  onChange={() =>
                    onUpdate(task.id, {
                      subTasks: task.subTasks.map((st, i) =>
                        i === index ? { ...st, completed: !st.completed } : st
                      ),
                    })
                  }
                  className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                />
                <span
                  className={
                    subTask.completed ? "line-through text-gray-500" : ""
                  }
                >
                  {subTask.description}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskCard;
