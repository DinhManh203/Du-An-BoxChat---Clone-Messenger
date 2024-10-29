import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '', // Thêm trường name
    email: '',
    password: '',
    profile_pic: ''
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const uploadPhoto = await uploadFile(file);
      console.log("uploadPhoto", uploadPhoto);

      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url || ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, formData);
      console.log("response", response);
      toast.success(response?.data?.message);

      if(response.data.success) {
        setFormData({
          name: '', 
          email: '',
          password: '',
          profile_pic: ''
        });
        navigate('/email');
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
          <h3 className="text-2xl text-center">Register</h3>
          
          {/* Field for Name */}
          <div>
            <label className="block mb-2 text-sm text-gray-700"></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring input-field"
            />
          </div>

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

          {/* Field for Uploading Photo */}
          <div>
            <label className="block mb-2 text-sm text-gray-700">Upload photo</label>
            {!photoPreview && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring input-field"
              />
            )}
            {photoPreview && (
              <div className="flex flex-col items-center my-auto">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhoto(null);
                    setPhotoPreview(null);
                  }}
                  className="mt-1 px-2 py-1 text-white bg-red-500 rounded hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 submit-button">
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account? <Link to={"/email"} className="text-blue-500 no-underline">Login</Link>
        </p>
      </div>
      
      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500">
        <p>Messenger &copy; 2021</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
