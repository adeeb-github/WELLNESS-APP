import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../services/operations/authApi"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="flex min-h-screen w-full bg-richblack-900 text-white">
      {/* Left Section: Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-md p-10 sm:p-14 md:w-1/2">
        <h2 className="text-3xl font-semibold text-yellow-50 mb-6">Welcome Back</h2>
        <p className="text-richblack-300 mb-10 text-sm text-center">
          Please log in to your account to continue
        </p>
        <form onSubmit={handleOnSubmit} className="w-full flex flex-col gap-y-4">
          <label className="w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="form-style w-full bg-richblack-800 border border-richblack-700 rounded-md px-3 py-2 text-white"
            />
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full bg-richblack-800 border border-richblack-700 rounded-md px-3 py-2 text-white pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-10 cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 bg-yellow-50 text-richblack-900 rounded-md py-2 px-4 font-semibold hover:bg-yellow-100 transition"
          >
            Sign In
          </button>
                    <button
           onClick={()=>navigate("/")}
            className="w-full mt-4 rounded-md bg-yellow-50 py-3 px-6 text-richblack-900 font-semibold hover:bg-yellow-100 transition duration-200"
          >
            Back To Home Page
          </button>
        </form>
      </div>

      {/* Right Section: Image */}
      <div className="hidden md:flex items-center justify-center w-1/2 bg-richblack-900">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSua-8CCw9YiYLQ_sMvkBXTcdFnBb61yzId7A&s"
          alt="Login Visual"
          className=" w-full  h-auto object-cover"
        />
      </div>
    </div>
  )
}

export default LoginForm
