import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-blue-700 text-white h-full fixed top-12 flex flex-col space-y-4 p-4 shadow-lg">
      {/* Sidebar Links */}
      <nav className='mt-6 font-semibold'>
        <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
          Dashboard
        </Link>
        <Link to="/add-task" className="block p-2 hover:bg-gray-700 rounded">
          Add Task
        </Link>
        <Link to="/completed" className="block p-2 hover:bg-gray-700 rounded">
          Completed Tasks
        </Link>
        <Link to="/pending/" className="block p-2 hover:bg-gray-700 rounded">
          Pending Task
        </Link>
        <Link to="/in-progress/" className="block p-2 hover:bg-gray-700 rounded">
          In Progress Task
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
