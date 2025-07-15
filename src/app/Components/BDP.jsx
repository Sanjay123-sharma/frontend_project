import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { DashboardComponent } from './Dashboard';
import { addBook } from '../Redux/Slice';
import toast, { Toaster } from 'react-hot-toast';

export default function BDP() {
  const { id } = useParams();
  const Data = useSelector((state) => state.book.Data);
  const Book = Data.find((book) => book.id.toString() === id);
  const Cart=useSelector((state)=>state.book.Cart);

  const dispatch=useDispatch()

  const handleAdd=(id)=>{
    let list=Cart
    let res=list.find((book)=>book.id===id)

    if(res){
toast('Book Already Added to Cart')
    }else{
toast.success('Book has been Added to Cart')
      dispatch(addBook(id))

    }
  }
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed top-0 left-0 h-full z-10">
        <DashboardComponent />
      </div>

      {/* Content Area */}
      <main className="ml-64 w-full p-6">
        {!Book ? (
          <div className="text-center mt-20">
            <h1 className="text-3xl font-semibold text-red-600">No Book Found</h1>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 md:flex md:gap-6 mt-10">
            <div className="md:w-1/3 flex-shrink-0">
              <img
                src={Book.coverImage}
                alt={Book.title}
                className="w-full h-auto rounded-lg shadow-md object-cover"
              />
            </div>

            <div className="md:w-2/3 mt-4 md:mt-0 space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{Book.title}</h1>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">Author:</span> {Book.author}
              </p>
              <p className="text-sm inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {Book.category}
              </p>
              <p className="text-gray-700">{Book.description}</p>
<Toaster  
 position="top-center"
  reverseOrder={false}
/>
 

              <button className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
              onClick={()=>handleAdd(Book.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
