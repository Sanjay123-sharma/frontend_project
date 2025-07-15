import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import { removeReturnBook } from '../Redux/Slice'
import toast, { Toaster } from 'react-hot-toast'



export default function ReturnForm() {

    const ReturnBook=useSelector((state)=>state.book.ReturnBook)
    const Navigate=useNavigate('')
    const dispatch=useDispatch()

    const handleMail=async()=>{
       const returnSummary = `
Purchase ID: ${Date.now()}
Items: ${ReturnBook.length}
Total: ₹100
Delivery Address: ${formik.values.street}, ${formik.values.city}, ${formik.values.pinCode}, ${formik.values.state}
  `;

  try {
   await axios.post("http://localhost:5000/send-mail2", {
      to: formik.values.email,
      name: formik.values.username,
      returnSummary,
    });

  } catch (err) {
    console.error("Email send error:", err);
    toast.error("📦  email failed.");
  }

    }


    const formik=useFormik({
        initialValues:{
          username:'',
          mobile:"",
          email:"",
          street:"",
          city:"",
          state:"",
          pinCode:""
        },
      onSubmit: async (values, { resetForm }) => {
  const items = {
    username: values.username,
    city: values.city,
    street: values.street,
    state: values.state,
    mobile: values.mobile,
    pinCode: values.pinCode,
    ReturnDetails: ReturnBook, 
  };

  try {
    await axios.post('http://localhost:5000/return/form', items);

    toast.success('Request Generated Successfully'); 
    dispatch(removeReturnBook());          

    resetForm(); 

    setTimeout(() => {
      Navigate('/profile');  
    }, 500);
    
    handleMail()
    
  } catch (error) {
    console.error(error);
    toast.error('Failed to submit return request');
  }
},
        validationSchema:Yup.object({
          username:Yup.string().required('This is required Field'),
          street:Yup.string().required('This is required Field'),
          city:Yup.string().required('This is required Field'),
          state:Yup.string().required('This is required Field'),
           email:Yup.string().email('Enter a valid Email').required('This is required Field').matches(/^(?!.*@[^,]*,)/,'Enter a valid Email'),
          mobile:Yup.string().required('This is required Field').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,'Enter 10 digit Mobile Number').min(10,'To short').max(10,'To Long'),
          pinCode:Yup.string().required('This is required Field').min(6,'PinCode Should be 6 digits').max(6,'PinCode Should be 6 digits'),
        })
    })

  return (
   <div className="p-4">
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.username && formik.errors.username && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>

       <div>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

      <div>
        <input
          type="number"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter 10 digit Mobile Number"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.mobile && formik.errors.mobile && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.mobile}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Street"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.street && formik.errors.street && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.street}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="City"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.city && formik.errors.city && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.city}</p>
        )}
      </div>

      <div>
        <input
          type="text"
          name="state"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="State"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.state && formik.errors.state && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.state}</p>
        )}
      </div>

      <div>
        <input
          type="number"
          name="pinCode"
          value={formik.values.pinCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter 6 digit PinCode"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formik.touched.pinCode && formik.errors.pinCode && (
          <p className="text-red-600 text-sm mt-1">{formik.errors.pinCode}</p>
        )}
      </div>
<Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          
        >
          Return Request
        </button>
      </div>
    </form>
  </div>
  )
}
