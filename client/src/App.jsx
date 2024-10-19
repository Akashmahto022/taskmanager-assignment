import React from "react";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import CompletedTask from "./pages/completed task/CompletedTask";
import InProgress from "./pages/in-progress/InProgress";
import Task from "./pages/task/Task";
import Tasks from "./pages/tasks/Tasks";
import Pending from "./pages/pending/Pending";

const App = () => {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/completed/:status" element={<CompletedTask />} />
          <Route path="/in-progress/:status" element={<InProgress />} />
          <Route path="/pending/:status" element={<Pending />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </main>
  );
};

export default App;
