import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage";
import CalendarPage from "./components/CalendarPage";
import TaskModal from "./components/TaskModal";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), createdAt: new Date() }]);
    setIsModalOpen(false);
    toast.success("Task added successfully!");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.info("Task status updated");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task deleted");
  };

  const updateTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
    toast.success("Task updated successfully!");
  };

  const editTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleEditTask = (updatedTask) => {
    updateTask(editingTask.id, updatedTask);
    setEditingTask(null);
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <nav className="bg-blue-600 p-6 fixed w-full z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-3xl font-bold">
              Task Manager
            </Link>
            <div className="space-x-6">
              <Link to="/" className="text-white text-xl hover:text-blue-200">
                Home
              </Link>
              <Link
                to="/calendar"
                className="text-white text-xl hover:text-blue-200"
              >
                Calendar
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
                onOpenModal={() => {
                  setEditingTask(null);
                  setIsModalOpen(true);
                }}
                onEditTask={editTask}
              />
            }
          />
          <Route path="/calendar" element={<CalendarPage tasks={tasks} />} />
        </Routes>
        {isModalOpen && (
          <TaskModal
            onClose={() => {
              setIsModalOpen(false);
              setEditingTask(null);
            }}
            onAddTask={addTask}
            onEditTask={handleEditTask}
            editingTask={editingTask}
          />
        )}
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
