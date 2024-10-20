import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";


const Pending = () => {
  const url = "https://taskmanager-backend-8tz3.onrender.com";
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
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


  useEffect(() => {
    const inProgressTasks = tasks.filter((task) => task.status === 'pending');
    console.log(inProgressTasks)
    setFilteredTasks(inProgressTasks); 
  }, [tasks]); 

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
    <div className="mt-[70px]">
      <h1 className="text-2xl font-bold mb-2">Pending Task</h1>
      <h2 className="text-black mb-2">Here is list of Pending tasks that you are working on</h2>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-2 border-b">No</th>
              <th className="px-2 py-2 border-b">Title</th>
              <th className="px-2 py-2 border-b">Category</th>
              <th className="px-2 py-2 border-b">Status</th>
              <th className="px-2 py-2 border-b">Due Date</th>
              <th className="px-2 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (filteredTasks.map((task, index) => (
              <tr key={task._id} className="text-center">
                <td className="px-4 py-2 border-b">{index+1}</td>
                <td className="px-4 py-2 border-b">{task.title}</td>
                <td className="px-4 py-2 border-b">
                {task.category ? task.category.name : "No defined"}
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
            ))): "you don't have any pending task"}
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
              <strong>Category:</strong> {selectedTask.category ? selectedTask.category.name : "not defined"}
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

export default Pending;
