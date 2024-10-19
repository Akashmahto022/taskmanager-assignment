import React from "react";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import {Routes, Route} from 'react-router-dom'
import AuthLayout from "./components/auth/Layout";

const App = () => {
  return (
    <div className=" flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
