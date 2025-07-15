import React from 'react'
import { useSelector } from 'react-redux'
import { DashboardComponent2 } from './LoginDashboard'


export default function Confirmation2() {
  const OrderDet = useSelector((state) => state.book.OrderDet)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64 fixed h-full bg-[#0f172a] text-white">
        <DashboardComponent2 />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 sm:p-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-100 text-green-600 rounded-full p-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Purchase Confirmed!</h1>
            <p className="text-gray-600 text-sm">Your ebook has been successfully added to your library</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">📘 Order Details</h2>

            {OrderDet.map((item) => (
              <div key={item.orderId} className="bg-white rounded-md p-4 shadow flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded-md border"
                />

                <div className="flex-1 space-y-1 text-sm text-gray-700">
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">by {item.author}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">Borrowed: {item.borrow_day} Days</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">Return: {item.return_day}/{item.return_month}/{item.return_year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
