import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AllBorrow, OrderDetails, removeCart } from '../Redux/Slice';
import { useNavigate } from 'react-router';
import { DashboardComponent2 } from './LoginDashboard';

export default function Shipping2() {
     const Cart=useSelector((state)=>state.book.Cart)
    const totalBook=Cart.length;
    const AvgDuartion=Cart.reduce((x,item)=>{
        return x+ Math.round((item.borrow_day)/totalBook)
    },0)

    const Navigate=useNavigate()
    const dispatch=useDispatch()
    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            street:"",
            pinCode:"",
            state:'',
            payment:'',
            city:"",
            mobile:''
        },
        onSubmit:async(values,{resetForm})=>{
          const Items={
            name:values.name,
            email:values.email,
            street:values.street,
            pinCode:values.pinCode,
            state:values.state,
            payment:values.payment,
            city:values.city,
            mobile:values.mobile,
            OrderDetails:[Cart]
          }
          
         try {
          await axios.post('http://localhost:5000/shipping/form',Items);
           if(formik.values.payment==='card'){
            handlePayment2()
           }else{

            dispatch(OrderDetails())
            dispatch(AllBorrow())
            dispatch(removeCart())
            resetForm()
            setTimeout(() => {
              Navigate('/order-confirmation')
            }, 5000);
            toast.success('Borrow Book Successfully')
            handleMail2()
           }
          
         } catch (error) {
          console.log(error)
        
          
         }

        },
        validationSchema:Yup.object({
            name:Yup.string().required('This is required Field'),
            street:Yup.string().required('This is required Field'),
            city:Yup.string().required('This is required Field'),
            state:Yup.string().required('This is required Field'),
            payment:Yup.string().required('This is required Field'),
            email:Yup.string().email('Enter a valid Email').required('This is required Field').matches(/^(?!.*@[^,]*,)/,'Enter a valid Email'),
            mobile:Yup.string().required('This is required Field').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,'Enter 10 digit').min(10,'To short').max(10,'To Long'),
            pinCode:Yup.string().required('This is required Field').min(6,'Zipcode should be 6 digits').max(6,'Zipcode should be 6 digits')
        })
    })

    // payment
    const handlePayment2=()=>{
        const options={
            key:'rzp_test_10bPvq7zFtWaxp',
            amount:100*100,
            currency:'INR',
            name:'Book Vault',
            description:'Book Borrow Shipping Payment',

            handler:(response)=>{
              dispatch(OrderDetails())
              dispatch(AllBorrow())
              dispatch(removeCart())
              setTimeout(() => {
                Navigate('/order-confirmation')
              }, 500);
              toast.success('Borrow Book Successfully')
              handleMail2()

            },

            prefill:{
                name:formik.values.name,
                email:formik.values.email,
                contact:formik.values.mobile
            },
            notes:{
                address:`
                Street:${formik.values.street},
                City:${formik.values.city},
                State:${formik.values.state},
                PinCode:${formik.values.pinCode}
                `
            },
            theme:{
                 color: '#121212', // Primary button color
                 backdrop_color: '#1e1e1e',// (dark)
                 hide_topbar: false,
            }
        }
        const razorpay=new window.Razorpay(options);
        razorpay.open()
    }

    // Mail

    const handleMail2=async()=>{
        const OrderSummary = `
Purchase ID: ${Date.now()}
Items: ${totalBook}
Total: ₹100
Delivery Address: ${formik.values.street}, ${formik.values.city}, ${formik.values.pinCode}, ${formik.values.state}
  `;

  try {
   await axios.post("http://localhost:5000/send-mail", {
      to: formik.values.email,
      name: formik.values.name,
      OrderSummary,
    });

  } catch (err) {
    console.error("Email send error:", err);
    toast.error("📦 Order placed, but email failed.");
  }
    }


  return (
    <div>
        <div>
         
     <div className="hidden md:block w-64 bg-[#0f172a] text-white fixed h-full">
          <DashboardComponent2 />
        </div>

        


    <div className="flex-1 lg:ml-[250px] xl:mr-[320px] px-2 py-10 max-w-4xl w-full mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">📦 Checkout</h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-6">🚚 Delivery Information</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
        
          <div>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Full Name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
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
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Mobile Number"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Zip Code"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.pinCode && formik.errors.pinCode && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.pinCode}</p>
            )}
          </div>

      
          <div className="pt-2">
            <h3 className="font-semibold mb-2">💳 Select Payment Method</h3>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cash on delivery"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                Cash on Delivery
              </label>
            </div>
            {formik.touched.payment && formik.errors.payment && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.payment}</p>
            )}
          </div>

        <div>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
        </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {formik.values.payment === 'card' ? '💳 Pay Now' : '📦 Place Order'}
          </button>
        </form>
      </div>
    </div>
    </div>

    <div className="hidden xl:block fixed top-0 right-0 w-[300px] h-full p-4 overflow-y-auto">
          <Summary3 totalBook={totalBook} AvgDuartion={AvgDuartion} />
        </div>
      
    </div>
  )
}

export const Summary3=({totalBook,AvgDuartion})=>{
    const shipping_fee=100
    return(
        <div className="bg-white rounded shadow p-6 sticky top-6 space-y-4">
  <div>
    <h1 className="text-xl font-bold text-gray-800 mb-1">📊 Borrow Summary</h1>
    <p className="text-sm text-gray-600">Review your borrowing details</p>
  </div>

  <div className="text-sm text-gray-700 space-y-1">
    <div className="flex justify-between">
      <span>Total Books:</span>
      <span className="font-medium">{totalBook}</span>
    </div>
    <div className="flex justify-between">
      <span>Average Duration:</span>
      <span className="font-medium">{AvgDuartion} days</span>
    </div>
    <div className="flex justify-between">
      <span>Borrowing Fee:</span>
      <span className="text-green-600 font-semibold">FREE</span>
    </div>
    <div className="flex justify-between">
      <span>Shipping Fee:</span>
      <span className="text-green-600 font-semibold">₹{shipping_fee}</span>
    </div>
    <hr className="my-2" />
    <div className="flex justify-between font-bold text-lg">
      <span>Total Cost:</span>
      <span className="text-green-600">₹{shipping_fee}</span>
    </div>
    <p className="text-xs text-gray-500">Only pay if books are returned late</p>
  </div>


</div>

    )
}
