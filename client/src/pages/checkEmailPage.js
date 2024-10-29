import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

    try {
      const response = await axios.post(URL, formData);
      console.log("response", response);
      toast.success(response?.data?.message);

      if(response.data.success) {
        setFormData({
          email: '',
          password: ''
        });
        navigate('/dashboard');
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-1">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-xl form-container">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-2xl text-center">Login</h3>

          {/* Field for Email */}
          <div>
            <label className="block mb-2 text-sm text-gray-700"></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring input-field"
            />
          </div>

          {/* Field for Password */}
          <div>
            <label className="block mb-2 text-sm text-gray-700"></label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring input-field text-black"
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600 focus:outline-none"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-gradient-to-r hover:from-[#0695FF] hover:via-[#A334FA] hover:to-[#FF6968] focus:outline-none focus:ring-2 focus:ring-blue-300 submit-button transition-0.3s duration-300 ease-in-out">
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account? <Link to={"/register"} className="text-blue-500 no-underline">Register</Link>
        </p>
      </div>
      <footer className="mt-10 text-center text-gray-500">
        <p>Messenger &copy; 2021</p>
      </footer>
    </div>
  );
};

export default LoginPage;
