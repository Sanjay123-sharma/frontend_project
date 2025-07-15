import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const ApiData=createAsyncThunk('book',async()=>{
    let response=await axios.get('http://localhost:5000/book/api');
    return response.data;
});




export const Slice=createSlice({
    name:'book',
    initialState:{
        Data:[],
        loading:false,
        error:null,
        Cart:[],
        return_date:{
        today:new Date().getDate(),
        month:new Date().getMonth()+1,
        year:new Date().getFullYear()
        },
        OrderDet:[],
        BorrowDet:[],
        ReturnBook:[],

        email:"",
        password:"",
        token:""

    },
    extraReducers:(boiler)=>{
        boiler.addCase(ApiData.pending,(state)=>{
            state.loading=true
        }).addCase(ApiData.fulfilled,(state,action)=>{
            state.loading=false
            state.Data=action.payload

        }).addCase(ApiData.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    },
    reducers:{
        addBook:(state,action)=>{
            let list=state.Data
            let res=list.find((book)=>book.id===action.payload);

            state.Cart.push({
                id:res.id,
                title:res.title,
                coverImage:res.coverImage,
                author:res.author,
                borrow_day:10,
                category:res.category,
                return_day:state.return_date.today+5+res.return,
                return_month:state.return_date.month,
                return_year:state.return_date.year,
                purchase_day:state.return_date.today,
                purchase_month:state.return_date.month,
                purchase_year:state.return_date.year  
            })
        },
        removeBook:(state,action)=>{
            state.Cart=state.Cart.filter((book)=>book.id!==action.payload);
        },
        increment:(state,action)=>{
            
            let list=state.Cart
            let res=list.find((book)=>book.id===action.payload);
            if(res){
              if(res.borrow_day>=30){
        console.log('restrict')
              }else{
                res.borrow_day=res.borrow_day+1
               
                if(res.return_day>=30){
                    res.return_day=1
                  
                   if(res.return_month>=12){
                    res.return_month=1
                    res.return_year=res.return_year+1
                   } else{
                    res.return_month=res.return_month+1 

                   }
                }else{
                     res.return_day=res.return_day+1

                }
            
              }

            }

        },
        decrement:(state,action)=>{
             let list=state.Cart
            let res=list.find((book)=>book.id===action.payload)
            if(res){
               if(res.borrow_day<=1){
                console.log('cannot be -ve')
               }else{
                res.borrow_day=res.borrow_day-1

                if(res.return_day<=1){
                    res.return_day=30+1
                    res.return_month=res.return_month-1


                }
                if(res.return_month<1){
                    res.return_month=12
                    res.return_day=30+1
                    res.return_year=res.return_year-1

                }
                    res.return_day=res.return_day-1

               }
            }
        
        },
        removeCart:(state)=>{
            state.Cart=[]
        },
        OrderDetails:(state)=>{
       
         const newOrders=state.Cart.map((item)=>({
                ...item,
                orderId:Date.now()+Math.floor(Math.random() * 1000),
                fine:false
            }))
            state.OrderDet=[...newOrders]
        },
        AllBorrow:(state)=>{
            state.BorrowDet=[...state.OrderDet,...state.BorrowDet]
            
        },
       
        returnBook:(state,action)=>{
           
            let res2=state.ReturnBook.find((book)=>book.orderId===book.orderId);

            if(res2){
                console.log('already added')

            }else{
                 let list=state.BorrowDet;
                  let res= list.find((book)=>book.orderId===action.payload)
           state.ReturnBook.push({
            id:res.orderId,
            title:res.title,
            return_day:res.return_day,
            return_month:res.return_month,
            return_year:res.return_year,
            fine:res.fine
           })

            }
          
           
        },

        removeReturnBook:(state)=>{
            state.ReturnBook=[]
        },

       fineLogic:(state,action)=>{
        let res=state.BorrowDet.find((book)=>book.id===action.payload)
        if(res){
            if(new Date().getDate()>=res.return_date || new Date().getMonth()>res.return_month){
                res.fine=true
            }
        }

        },

        returnOrderRemove:(state,action)=>{
            state.BorrowDet=state.BorrowDet.filter((book)=>book.orderId!==action.payload)
        },
        setEmail:(state,action)=>{
            state.email=action.payload
        },
        setPassword:(state,action)=>{
            state.password=action.payload
        }

        

    }
})

export default Slice.reducer

export const {addBook,increment,decrement,removeBook,removeCart,OrderDetails,AllBorrow,returnBook,removeReturnBook,fineLogic,returnOrderRemove,setEmail,setPassword}=Slice.actions
