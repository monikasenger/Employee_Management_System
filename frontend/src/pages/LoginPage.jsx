import React, { useContext, useState, useEffect } from 'react';
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import loginImg from "../assets/login.png";
import logo from "../assets/logo.png";
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { backend, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
const {user,loginWithRedirect}=useAuth0();
  //  State for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //  Login submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const { data } = await axios.post(`${backend}/api/users/login`, {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard"); 
    }
  }, [token, navigate]);

  return (
    <div onSubmit={handleSubmit} className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">
      {/* Left Illustration */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-opacity-30">
        <img
          src={loginImg}
          alt="Login Illustration"
          className="w-full max-w-lg object-contain rounded-3xl shadow-2xl border border-blue-200"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-10"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} alt="EmployEase" className="h-20 w-auto drop-shadow-md" />
          </div>

          <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-1">Welcome Back 👋</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Login to <span className="font-semibold text-blue-700">EmployEase</span> and manage your team efficiently.
          </p>

          {/* Google Button - */}
        <button
          onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-full font-semibold shadow-md mb-6 hover:scale-105 hover:shadow-lg transition"
        >
          <FaGoogle />
          Login with Google
        </button>

          {/* Divider */}
          <div className="flex items-center justify-between mb-5">
            <span className="h-px w-1/3 bg-gray-300"></span>
            <span className="text-gray-500 text-sm">OR</span>
            <span className="h-px w-1/3 bg-gray-300"></span>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm mb-5">
            <a href="forgot-password" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          {/* Login button */}
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition">
            Login
          </button>

          {/* Signup redirect */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-700 font-semibold hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
