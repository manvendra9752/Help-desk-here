// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ticketReducer from "./ticketSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    ticket: ticketReducer,
  },
});

export default store;
