import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateTaskModal = ({ task, isOpen, onClose, fetchTasks }) => {
  const url = "http://localhost:4000";
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [category, setCategory] = useState(task.category);
  const [dueDate, setDueDate] = useState(task.dueDate);

  // Function to handle updating the task
  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(
        `${url}/api/task/update/${task._id}`,
        {
          title,
          description,
          status,
          dueDate,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      fetchTasks();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Update Task</h2>

        {/* Title */}
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />

        {/* Description */}
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />

        {/* Status */}
        <label className="block mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {/* Due Date */}
        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleUpdateTask}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
