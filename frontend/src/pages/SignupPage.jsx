import React, { useState, useContext, useEffect } from "react";
import { FaGoogle, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import signupImg from "../assets/signup.png";
import logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const SignupPage = () => {
  const { backend, setToken, token } = useContext(AppContext);
  const navigate = useNavigate();
const {user,loginWithRedirect}=useAuth0();
console.log('current user',user);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fullName || !email || !password || !confirmPassword) {
    toast.error("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    const { data } = await axios.post(`${backend}/api/users/signup`, {
      fullName,
      email,
      password,
      confirmpassword: confirmPassword,
    });

    console.log("Signup Response:", data); 

    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } else {
      toast.error(data.message || "Signup failed");
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div onSubmit={handleSubmit} className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100">
      {/* Left Image */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <img
          src={signupImg}
          alt="Signup"
          className="w-full max-w-lg object-contain rounded-3xl shadow-2xl border border-blue-200"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/70 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-10"
        >
          <div className="flex justify-center mb-6">
            <img src={logo} alt="EmployEase" className="h-20 w-auto drop-shadow-md" />
          </div>

          <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-1">Create Your Account</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Join <span className="font-semibold text-purple-700">EmployEase</span> and simplify your HR journey.
          </p>

        <button
  onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
  type="button"
  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-full font-semibold shadow-md mb-6 hover:scale-105 hover:shadow-lg transition"
>
  <FaGoogle />
  Sign Up with Google
</button>




          <div className="flex items-center justify-between mb-5">
            <span className="h-px w-1/3 bg-gray-300"></span>
            <span className="text-gray-500 text-sm">OR</span>
            <span className="h-px w-1/3 bg-gray-300"></span>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-gray-400" />
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-2.5 rounded-full font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-blue-700 font-semibold hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
