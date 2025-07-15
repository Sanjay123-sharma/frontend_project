import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SliceReducer from './Slice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  version:2,
 
//  migrate: (state) => {
//     // Clear or transform state if needed
//     return Promise.resolve(undefined); // This will use the new initial state
//   },
 

};
const userReducer=combineReducers({
    book:SliceReducer
})

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store=configureStore({
    reducer:persistedReducer,
     devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor=persistStore(store)