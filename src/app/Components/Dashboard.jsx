import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


export default function Dashboard() {
 
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Reusable Sidebar */}
      <DashboardComponent />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome Back, Demo User!</h1>
            <p className="text-sm text-white/80 mt-1">Discover your next great read</p>
          </div>
          <div className="text-5xl opacity-30">📘</div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard label="Books Available" value="1,247" delta="+12" color="text-green-500" />
          <StatCard label="Active Loans" value="89" delta="-3" color="text-red-500" />
          <StatCard label="New Members" value="24" delta="+8" color="text-blue-500" />
          <StatCard label="Overdue Items" value="12" delta="-2" color="text-orange-500" />
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <NavLink to={'/catalog'}  bg="bg-green-500" className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Browse Catalog
            </NavLink>
           <NavLink to={'/profile'} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
             My Profile
           </NavLink >
           <button bg="bg-green-500" className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
             Pay Fines

           </button>
           
           
          </div>
        </div>
      </main>
    </div>
  )
}

const StatCard = ({ label, value, delta, color }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <div className="flex justify-between items-end mt-2">
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      <span className={`text-sm font-medium ${color}`}>{delta}</span>
    </div>
  </div>
)

const QuickAction = ({ label, icon, bg }) => (
  <button className={`flex items-center justify-center gap-2 text-white py-3 rounded-md ${bg} hover:opacity-90`}>
    <span>{icon}</span>
    <span>{label}</span>
  </button>
)


export const DashboardComponent = () => {
   const Cart=useSelector((state)=>state.book.Cart)
  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col justify-between min-h-screen">
      <div>
        {/* Logo and Title */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-white">📘 BookVault</h1>
          <p className="text-sm text-gray-400">Digital Library</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 mt-6 px-4 text-sm">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-gray-300'
              }`
            }
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-gray-300'
              }`
            }
          >
            📚 Book Catalog
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition relative ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-gray-300'
              }`
            }
          >
            🛒 Cart <span style={{color:'red',fontWeight:'inherit',fontSize:"medium"}}>{Cart.length}</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md transition ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-gray-300'
              }`
            }
          >
            👤 My Profile
          </NavLink>

       
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 text-sm text-gray-400 flex justify-between items-center">
        <span>© {new Date().getFullYear()} BookVault</span>
        <NavLink
          to="/"
          className="text-white hover:underline transition"
        >
          Logout
        </NavLink>
      </div>
    </aside>
  )
}
