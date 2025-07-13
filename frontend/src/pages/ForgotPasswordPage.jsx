import { FaEnvelope } from "react-icons/fa";
import forgotImg from "../assets/forgot.png";
import logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { backend, token } = useContext(AppContext);
  const navigate = useNavigate();

  //  Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email");

    try {
      const { data } = await axios.post(`${backend}/api/users/forget-password`, { email });

      if (data.success) {
        toast.success("Reset link sent to your email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reset link");
    }
  };

  // Redirect if user already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-100 via-blue-100 to-white">
      
      {/* Left Side Image */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <img
          src={forgotImg}
          alt="Forgot Password"
          className="w-full max-w-lg object-contain rounded-3xl shadow-lg border border-blue-200"
        />
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white/80 backdrop-blur-md border border-blue-200 rounded-3xl shadow-xl p-10"
        >
          <div className="flex justify-center mb-6">
            <img src={logo} alt="EmployEase" className="h-16 w-auto drop-shadow-md" />
          </div>

          <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-2">
            Forgot Your Password?
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter your email and we’ll send you a reset link.
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-blue-400 text-sm" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white py-2.5 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
          >
            Send Reset Link
          </button>

          {/* Back to Login Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Remembered your password?{" "}
            <a href="/login" className="text-blue-700 font-semibold hover:underline">
              Back to Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
