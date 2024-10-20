import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";

const mockTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description for task 1",
    status: "Pending",
    dueDate: "2024-10-20",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description for task 2",
    status: "Completed",
    dueDate: "2024-10-21",
  },
  {
    id: 3,
    title: "Task 3",
    description: "",
    status: "In Progress",
    dueDate: "",
  },
];

const Dashboard = () => {
  const url = "http://localhost:4000";
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const token = user.accessToken;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${url}/api/task/all-tasks`, {
          withCredentials: true,
        });
        console.log(response.data);
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Open the modal and set the selected task
  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Due Date</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="px-4 py-2 border-b">{task.title}</td>
                <td className="px-4 py-2 border-b">
                  {task.description || "No description"}
                </td>
                <td className="px-4 py-2 border-b">{task.status}</td>
                <td className="px-4 py-2 border-b">
                  {task.dueDate || "No due date"}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal(task)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Details Modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Task Details</h2>
            <p>
              <strong>Title:</strong> {selectedTask.title}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedTask.description || "No description"}
            </p>
            <p>
              <strong>Status:</strong> {selectedTask.status}
            </p>
            <p>
              <strong>Due Date:</strong> {selectedTask.dueDate || "No due date"}
            </p>

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
