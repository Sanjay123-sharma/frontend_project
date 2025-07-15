import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setPassword } from '../Redux/Slice'
import { NavLink, useNavigate } from 'react-router'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Register() {
  return (
    
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Section */}
      <div className="bg-blue-50 p-10 flex flex-col justify-center">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">BookVault</h1>
          </div>
          <p className="text-gray-600 mb-10 text-lg">Your Digital Library Experience</p>

          <div className="space-y-6">
            <Feature title="Vast Collection" desc="Access thousands of books across all genres" iconBg="bg-blue-100" />
            <Feature title="Easy Management" desc="Track your reading progress and manage loans" iconBg="bg-green-100" />
            <Feature title="Digital First" desc="Modern library experience with digital convenience" iconBg="bg-purple-100" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white p-10 flex flex-col justify-center shadow-xl">
        <div className="max-w-md mx-auto w-full">
          <RegisterForm/>
        </div>
      </div>
      
    </div>
  )
}

const Feature = ({ title, desc, iconBg }) => (
  <div className="flex items-start gap-4">
    <div className={`w-10 h-10 rounded-md ${iconBg} flex items-center justify-center`}>
      <span className="text-2xl">📚</span>
    </div>
    <div>
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </div>
)

export const RegisterForm=()=>{
    const Navigate=useNavigate()
    const email=useSelector((state)=>state.book.email)
    const password=useSelector((state)=>state.book.password)
    const [errors,setErrors]=useState('')
    const dispatch=useDispatch()
    const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and number';
    }

    return newErrors;
  };

     const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {

        const items={
            email:email,
            password:password
        }

        try {
            let response=await axios.post('http://localhost:5000/signup',items);
            console.log(response.data);
            if(response.data==='User Already Register'){
                toast("User Already Register")
            }
            setTimeout(() => {
                
            Navigate('/')
            }, 500);
        } catch (error) {
            console.log(error)
        }
      
    } else {
      setErrors(validationErrors);
    }
  };
    return(
        <>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
      <p className="text-sm text-gray-500 mb-6">Sign in to your library account</p>

      <div className="flex gap-4 mb-6">
        <button className="w-full py-2 px-4 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200">
          <NavLink to="/dashboard">Demo User</NavLink>
        </button>
      </div>

      <div className="relative text-center mb-6">
        <span className="absolute inset-x-0 top-1/2 border-t border-gray-200"></span>
        <span className="relative bg-white px-4 text-sm text-gray-500">OR CONTINUE WITH</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>dispatch(setPassword(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" />
            Remember me
          </label>
          <NavLink className="text-blue-600 hover:underline">Forgot password?</NavLink>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
      Got to Login Page {' '}
        <NavLink className="text-blue-600 hover:underline" to={'/'}>Sign In</NavLink>
      </p>

        </>
    )
}