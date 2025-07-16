import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { setEmail, setPassword } from '../Redux/Slice';

export default function DeleteAccount() {

  const email=useSelector((state)=>state.book.email)
const password=useSelector((state)=>state.book.password);
const dispatch=useDispatch()
const Navigate=useNavigate()

  const [errors, setErrors] = useState({});

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
    e.preventDefault()
   
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      const items={
        email:email,
        password:password
    
      }
     try {
      let response=await axios.post('http://localhost:5000/delete',items);
      console.log(response.data)

      if(response.data==='User Delete Successfully'){
        toast.success(' Delete Account Successfully')
        setTimeout(() => {
          Navigate('/signup')
        }, 500);
      }
        
     } catch (error) {
      console.log(error)
        
        
     }
   
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
     <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
      <p className="text-sm text-gray-500 mb-6">Delete Account</p>

     

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
          <NavLink to={'/forget'} className="text-blue-600 hover:underline">Forgot password?</NavLink>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
         Delete Account
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don’t have an account?{' '}
        <NavLink className="text-blue-600 hover:underline" to={'/signup'}>Sign up</NavLink>
      </p>
    </>
  );
}
