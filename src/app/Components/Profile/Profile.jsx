import React, {} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardComponent } from '../Dashboard'
import { returnBook,fineLogic, returnOrderRemove } from '../../Redux/Slice'
import { NavLink, Outlet } from 'react-router'

export default function Profile() {
  const BorrowDet = useSelector((state) => state.book.BorrowDet)
  const OrderDet = useSelector((state) => state.book.OrderDet)

  //const ReturnBook = useSelector((state) => state.book.ReturnBook)
  const dispatch = useDispatch()

  const handleReturn=(orderId)=>{
    dispatch(returnBook(orderId))

    setTimeout(() => {
      dispatch(returnOrderRemove(orderId))
      
      
    }, 18000000);
  
   
  }
  const handleFine=(orderId)=>{
    dispatch(fineLogic(orderId))
    console.log(orderId)
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
    
      <div className="w-64 fixed left-0 top-0 h-full hidden md:block bg-white shadow-md z-10">
        <DashboardComponent />
      </div>

  
      <div className="flex-1 md:ml-64 p-4 md:p-8 overflow-x-hidden">
      
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-1">Demo User</h2>
          <p className="text-sm">demo@bookvault.com</p>
          <div className="text-sm mt-2">
            Member ID: <span className="font-semibold">BV001234</span> | Since: <span className="font-semibold">1/15/2023</span>
          </div>
          <span className="mt-2 inline-block bg-white text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">Premium Member</span>
        </div>

        {/* Current Borrows */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">📚 Current Borrows</h3>
          {(!OrderDet || OrderDet.length === 0) ? (
            <p className="text-gray-500">No Current Borrows</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {OrderDet.map((book) => (
                <div key={book.orderId} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                  <div className="flex gap-4">
                    <img src={book.coverImage} alt={book.title} className="w-20 h-28 object-cover rounded" />
                    <div>
                      <h4 className="font-semibold text-lg">{book.title}</h4>
                      <p className="text-gray-600">{book.author}</p>
                      <p className="text-sm mt-2">Borrow for: <span className="font-medium">{book.borrow_day} Days</span></p>
                        <p className="text-sm">Purchase Date : {book.purchase_day}/{book.purchase_month}/{book.purchase_year}</p>
                      <p className="text-sm">Return By: {book.return_day}/{book.return_month}/{book.return_year}</p>
                     
                    
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Borrows */}
        <div>
          <h3 className="text-xl font-semibold mb-4">📖 All Borrow History</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {BorrowDet && BorrowDet.map((item) => (
              <div key={item.orderId} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-gray-600">{item.author}</p>
                <p className="text-sm mt-1">Borrow for: {item.borrow_day} Days</p>
                <p className="text-sm">Due Date: {item.return_day}/{item.return_month}/{item.return_year}</p>
               <button onClick={()=>handleFine(item.orderId)}
               className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
               >
               ShowFine
               </button><br />
                {item.fine?<h2>500</h2>:<h2>No Fine</h2>}
                <NavLink to={'return-form'}>
                    <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={()=>handleReturn(item.orderId)}
                >Return</button>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
        <Outlet/>
      </div>

    </div>
  )
}
