import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth-slice";

const Login = () => {
  const url = "http://localhost:4000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response)
      localStorage.setItem("myToken", response.data.accessToken);
      const data = response.data;
      dispatch(setUser(data));
      navigate("/dashboard");
    } catch (error) {
      console.log("error while login the user", error.message);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
        <div className="w-full md:w-auto flex gap-0 md:gap-20 flex-col md:flex-row items-center justify-center">
          {/* left side */}
          <div className="h-full w-full lg:w-2/4 flex flex-col items-center justify-center">
            <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
              <span className="flex gap-1 py-4 px-3 border rounded-full text-4xl bordergray-300 text-blue-700 font-extrabold text-center">
                Manage all your task at one place!
              </span>
            </div>
          </div>

          {/* right side */}
          <div className="w-2/4 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Login
              </h2>
              <h2 className="mb-6 text-center text-gray-700">
                if don't have an account{" "}
                <Link
                  to={"/signup"}
                  className="underline text-blue-700 font-semibold"
                >
                  {" "}
                  Signup here
                </Link>
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label
                    className="block text-gray-600 font-semibold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
