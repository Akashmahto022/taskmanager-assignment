import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateTaskModal = ({ task, isOpen, onClose, fetchTasks }) => {
  const url = "http://localhost:4000";
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [category, setCategory] = useState(task.category);
  const [categories, setCategories] = useState([]);
  const [dueDate, setDueDate] = useState(task.dueDate);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/category/get`, {
          withCredentials: true,
        });
        if (response.data.length === 0) {
          setError("You don’t have any categories.");
        }
        setCategories(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  // Function to handle updating the task
  const handleUpdateTask = async () => {
    try {
      await axios.put(
        `${url}/api/task/update/${task._id}`,
        {
          title,
          description,
          status,
          category,
          dueDate,
        },
        {
          withCredentials: true,
        }
      );
      fetchTasks(); 
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
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

        {/* Category */}
        <label className="block mb-2">Category</label>
        <select
              id="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
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
