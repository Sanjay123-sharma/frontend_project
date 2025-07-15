import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, removeBook } from '../Redux/Slice'
import { DashboardComponent2 } from './LoginDashboard'
import { NavLink } from 'react-router'

export default function Cart2() {
    const Cart=useSelector((state)=>state.book.Cart)
     const totalBook=Cart.length
    const AvgDuartion=Cart.reduce((x,book)=>{
        return x+Math.round(((book.borrow_day)/Cart.length),1)
    },0)
    const dispatch=useDispatch()
    const handleIncrement=(id)=>{
        dispatch(increment(id))
    }
    const handleDecrement=(id)=>{
        dispatch(decrement(id))

    }

    const handleRemove=(id)=>{
        dispatch(removeBook(id))

    }
  return (
    <div>
        <div className="min-h-screen bg-gray-100 flex">
            <div className="hidden md:block w-64 bg-[#0f172a] text-white fixed h-full">
              <DashboardComponent2 />
            </div>
        
        
            <div className="flex-1 md:ml-64 px-4 py-8">
              {Cart.length === 0 ? (
                <h1 className="text-center text-2xl font-semibold text-gray-700">Cart is Empty</h1>
              ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 space-y-6">
                    {Cart.map((book) => (
                      <div key={book.id} className="bg-white rounded shadow p-6 flex flex-col md:flex-row gap-6 relative">
                        <div className="w-28 h-36 bg-gray-100 rounded overflow-hidden">
                          <img src={book.coverImage} alt={book.title} className="object-cover w-full h-full" />
                        </div>
        
                        <div className="flex-1 space-y-2">
                          <div className="text-lg font-semibold">{book.title}</div>
                          <div className="text-sm text-gray-500">{book.author}</div>
                          <div className="inline-block text-xs px-2 py-1 bg-gray-100 rounded-full font-medium text-gray-700">
                            {book.category}
                          </div>
                          
        
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-medium">Borrow for:</span>
                            <button
                              onClick={() => handleDecrement(book.id)}
                              className="px-3 py-1 bg-gray-200 rounded"
                            >
                              −
                            </button>
                            <div className="text-sm">{book.borrow_day}</div>
                            <button
                              onClick={() => handleIncrement(book.id)}
                              className="px-3 py-1 bg-gray-200 rounded"
                            >
                              +
                            </button>
                            <span className="text-sm text-gray-600">days</span>
                          </div>
        
                          <div className="bg-blue-50 text-sm text-gray-700 p-3 rounded mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600">📅</span>
                              <span>Return by: {book.return_day}/{book.return_month}/{book.return_year}</span>
                            </div>
                            <div className="text-xs text-gray-500">Late returns incur a fee of ₹500 per book</div>
                          </div>
                        </div>
        
                        <button
                          onClick={() => handleRemove(book.id)}
                          className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
        
                  <div className="w-full">
                    <Summary2 totalBook={totalBook} AvgDuartion={AvgDuartion} />
                  </div>
                </div>
              )}
            </div>
          </div>
      
    </div>
  )
}
export const Summary2=({totalBook,AvgDuartion})=>{
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

  <div className="space-y-2">
    <NavLink to="/Shipping-order">
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded">
        Proceed to Delivery →
      </button>
    </NavLink><br /><br />
    <NavLink to="/browse/catalog" className="block text-center text-sm text-gray-600 hover:underline">
      Continue Browsing
    </NavLink>
  </div>


  <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded mt-2">
    <h1 className='text-xl text-gray-700 '>Quick Info</h1><br />
    <ul className="list-disc list-inside space-y-2">
      <li>Free borrowing for all members</li>
      <li>Extend loans up to 30 days</li>
      <li>$0.50/day late fee applies</li>
      <li>Free pickup at library locations</li>
    </ul>
  </div>
</div>

    )
}