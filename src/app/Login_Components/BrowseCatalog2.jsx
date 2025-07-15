import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, ApiData } from '../Redux/Slice'
import { DashboardComponent2 } from './LoginDashboard'
import toast, { Toaster } from 'react-hot-toast'
import { NavLink } from 'react-router'

export default function BrowseCatalog2() {
     const Data = useSelector((state) => state.book.Data)
  const Cart = useSelector((state) => state.book.Cart)
  const error = useSelector((state) => state.book.error)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [visibleBooks, setVisibleBooks] = useState(12)
  

  const dispatch = useDispatch()

  useEffect(() => {
    let timer = setTimeout(() => {
      setQuery(search)
    }, 500)
    dispatch(ApiData())
    return () => clearTimeout(timer)
  }, [dispatch, search])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
      ) {
        setVisibleBooks((prev) => prev + 6)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filterSearch = Data.filter((book) =>
    book.title.replace(/\s+/g, '').toLowerCase().includes(query.replace(/\s+/g, '').toLowerCase())
  )

  const filterCategory = category === 'All'
    ? filterSearch
    : filterSearch.filter((book) => book.category === category)

  const displayedBooks = filterCategory.slice(0, visibleBooks)
  

  const handleAdd=(id)=>{
    let list=Cart
    let res=list.find((book)=>book.id===id)
    if(res){
     toast('Book Already Added to Cart')
    }else{
      toast.success("Book has been Added to Cart")
     
dispatch(addBook(id))
    }

  }
  return (
   <div className="flex">
      {/* Sidebar Fixed */}
      <div className="fixed top-0 left-0 h-screen w-64 z-10">
        <DashboardComponent2 />
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full min-h-screen bg-gray-100">
   
        <div className="sticky top-0 z-10 bg-gray-100 p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search books..."
            className="px-4 py-2 border rounded w-full md:w-1/3"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded w-full md:w-1/4"
          >
            <option value="All">All Categories</option>
            <option value="Mystery & Thriller">Mystery & Thriller</option>
            <option value="Historical & Biographical">Historical & Biographical</option>
            <option value="Fiction (General & Literary)">Fiction (General & Literary)</option>
            <option value="Specialized Non-Fiction">Specialized Non-Fiction.</option>
            <option value="Fantasy & Sci-Fi">Fantasy & Sci-Fi</option>
            <option value="Self-Improvement & Well-being">Self-Improvement & Well-being</option>
          </select>
        </div>

       
        <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {error ? (
            <h1 className="text-red-500 text-xl font-semibold">Error fetching data</h1>
          ) : (
            displayedBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <NavLink to={`/book/${book.id}`}>
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                    onError={(e) => e.target.src = '/fallback.jpg'}
                  />
                  <div className="p-4">
                    <h2 className="font-bold text-lg text-gray-800 truncate">{book.title}</h2>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="mt-1 text-xs text-white inline-block bg-blue-500 px-2 py-1 rounded">
                      {book.category}
                    </p>
                  </div>
                </NavLink
            
                >
                <div className="px-4 pb-4">
                  <Toaster
  position="top-center"
  reverseOrder={false}
/>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded mt-2"
                  
                  onClick={()=>handleAdd(book.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        
        
      </div>
    </div>
  )
}
