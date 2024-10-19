import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-[100px] bg-gray-800 text-white h-full fixed top-16 flex flex-col space-y-4 p-4 shadow-lg">
      {/* Sidebar Links */}
      <nav>
        <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
          Dashboard
        </Link>
        <Link to="/dashboard/tasks" className="block p-2 hover:bg-gray-700 rounded">
          Tasks
        </Link>
        <Link to="/dashboard/completed-tasks" className="block p-2 hover:bg-gray-700 rounded">
          Completed Tasks
        </Link>
        <Link to="/dashboard/pending" className="block p-2 hover:bg-gray-700 rounded">
          Pending
        </Link>
        <Link to="/dashboard/in-progress" className="block p-2 hover:bg-gray-700 rounded">
          In Progress
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
