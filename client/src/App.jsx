import React from "react";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import Layout from "./components/dashboard-view/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import CompletedTask from "./pages/completed task/CompletedTask";
import InProgress from "./pages/in-progress/InProgress";
import Task from "./pages/task/Task";
import Pending from "./pages/pending/Pending";

const App = () => {
  return (
    <div className=" flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/dashboard" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="completed-tasks" element={<CompletedTask />} />
          <Route path="in-progress" element={<InProgress />} />
          <Route path="tasks" element={<Task />} />
          <Route path="pending" element={<Pending />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
