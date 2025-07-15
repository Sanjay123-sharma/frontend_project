import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import BookCatalog from '../Components/BookCatalog'
import OrderConfirmatin from '../Components/Order/OrderConfirmatin';
import ReturnForm from '../Components/ReturnForm';
import Register from '../Components/Register';
import LoginDashboard from '../Login_Components/LoginDashboard';
import ForgetPassword from '../Login_Components/ForgetPassword';
import DeleteAccount from '../Login_Components/DeleteAccount';
import BrowseCatalog2 from '../Login_Components/BrowseCatalog2';
import Cart2 from '../Login_Components/Cart2';
import Shipping2 from '../Login_Components/Shipping2';
import Profile2 from '../Login_Components/Profile2';
import Confirmation2 from '../Login_Components/Confirmation2';
const  Profile=lazy(()=>import('../Components/Profile/Profile'));
const  Shipping=lazy(()=>import('../Components/Shipping'));
const Cart=lazy(()=>import('../Components/Cart'))
const  Home =lazy(()=>import('../Components/Home'))
const  Dashboard =lazy(()=>import('../Components/Dashboard'))
const  BDP =lazy(()=>import('../Components/BDP'))

export default function Router() {
    const router=createBrowserRouter([
        {
            path:'/',
            element:<Home/>,
        },
        {
            path:'/dashboard',
            element:<Dashboard/>
        },
        {
            path:"/catalog",
            element:<BookCatalog/>
        },
        {
                    path:'/book/:id',
                    element:<BDP/>          
        },
        {
            path:'/cart',
            element:<Cart/>
        },{
            path:'/shipping',
            element:<Shipping/>
        },{
            path:"/confirmation",
            element:<OrderConfirmatin/>
        },{
            path:'/profile',
            element:<Profile/>,
            children:[{
                 path:"return-form",
            element:<ReturnForm/>
                
            }]
        },{
            path:'/signup',
            element:<Register/>
        },{
            path:'/login-dashboard',
            element:<LoginDashboard/>
        },{
            path:'/forget',
            element:<ForgetPassword/>
        },{
            path:"/delete",
            element:<DeleteAccount/>
        },
        {
            path:"/browse/catalog",
            element:
                <BrowseCatalog2/>
        },
        {
            path:"/cart2",
            element:<Cart2/>
        },{
            path:"/Shipping-Order",
            element:<Shipping2/>
        },
        {
            path:"/order-confirmation",
            element:<Confirmation2/>
        },
       {
            path:'/myprofile',
            element:<Profile2/>,
            
        }
    ])
  return (
    <div>
        <RouterProvider  router={router}/>
      
    </div>
  )
}
