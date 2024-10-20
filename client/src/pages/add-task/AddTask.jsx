import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";


const AddTask = () => {
  const url = "http://localhost:4000";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState(new Date());
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  const navigate = useNavigate()

  // Fetch categories from the API
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
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
    }

    try {
      const response = await axios.post(
        `${url}/api/category/create`,
        { name: newCategoryName },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setCategories([...categories, response.data]);
      setCategory(response.data.name);
      setShowAddCategory(false);
      setNewCategoryName("");
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status,
      dueDate,
      category,
    };

    try {
      await axios.post(`${url}/api/task/create`, newTask, {
        withCredentials: true,
      });
      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate(new Date());
      setCategory("");
      navigate('/dashboard')
    } catch (err) {
      console.error("Failed to add task:", err.message);
    }
  };

  return (
    <div className="mt-[70px] w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Task Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Task Description
          </label>
          <textarea
            id="description"
            value={description}
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block h-full w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Task Status */}
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Associate Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <div className="flex items-center gap-2">
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
            <button
              type="button"
              onClick={() => setShowAddCategory(true)}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Add New Category
            </button>
          </div>
        </div>

        {/* Add Category Form */}
        {showAddCategory && (
          <div className="mb-4">
            <label
              htmlFor="newCategory"
              className="block text-sm font-medium text-gray-700"
            >
              New Category Name
            </label>
            <input
              type="text"
              id="newCategory"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Save Category
            </button>
            <button
              type="button"
              onClick={() => setShowAddCategory(false)}
              className="mt-2 ml-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
