import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { signup } from "../services/operations/authApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    about:"",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(
      signup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.about,
        navigate
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-richblack-800 text-white font-inter ">
      {/* Left Form Side */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8">
        <form
          onSubmit={handleOnSubmit}
          className="w-full max-w-xl space-y-6 bg-richblack-800 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold text-yellow-50 text-center">
            Create Your SoulNest Account
          </h2>

          <div className="flex gap-x-4">
            <label className="w-1/2">
              <p className="text-sm mb-1 text-richblack-5">First Name</p>
              <input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleOnChange}
                placeholder="First Name"
                className="form-style w-full px-3 py-2 rounded-md bg-richblack-700 text-white"
              />
            </label>

            <label className="w-1/2">
              <p className="text-sm mb-1 text-richblack-5">Last Name</p>
              <input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleOnChange}
                placeholder="Last Name"
                className="form-style w-full px-3 py-2 rounded-md bg-richblack-700 text-white"
              />
            </label>
          </div>
          <div className=" gap-x-4">

          <label className="w-full">
            <p className="text-sm mb-1 text-richblack-5">Email Address</p>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="form-style w-full px-3 py-2 rounded-md bg-richblack-700 text-white"
            />
          </label>
          </div>

          <div className="flex gap-x-4">
            <label className="relative w-1/2">
              <p className="text-sm mb-1 text-richblack-5">Create Password</p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Password"
                className="form-style w-full px-3 py-2 pr-10 rounded-md bg-richblack-700 text-white"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </label>

            <label className="relative w-1/2">
              <p className="text-sm mb-1 text-richblack-5">Confirm Password</p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="form-style w-full px-3 py-2 pr-10 rounded-md bg-richblack-700 text-white"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} />
                ) : (
                  <AiOutlineEye fontSize={22} />
                )}
              </span>
            </label>
          </div>
        <div className=" gap-x-4">
          <label className="w-full">
            <p className="text-sm mb-1 text-richblack-5">About Yourself</p>
            <input
              required
              type="text"
              name="about"
              value={formData.about}
              onChange={handleOnChange}
              placeholder="Tell Something About Yourself"
              className="form-style w-full px-5 py-5 gap-x-4 rounded-md bg-richblack-700 text-white"
            />
          </label>
          </div>

          <button
            type="submit"
            className="w-full mt-4 rounded-md bg-yellow-50 py-3 px-6 text-richblack-900 font-semibold hover:bg-yellow-100 transition duration-200"
          >
            Create Account
          </button>
          <button
           onClick={()=>navigate("/")}
            className="w-full mt-4 rounded-md bg-yellow-50 py-3 px-6 text-richblack-900 font-semibold hover:bg-yellow-100 transition duration-200"
          >
            Back To Home Page
          </button>
        </form>
      </div>

      {/* Right Image Side */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6 bg-richblack-800">
        <img
          src="https://arohanyoga.com/wp-content/uploads/2024/03/Meditation-vs.-Yoga.jpg"
          alt="Yoga Illustration"
          className="rounded-lg shadow-lg max-h-[500px] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignupForm;
