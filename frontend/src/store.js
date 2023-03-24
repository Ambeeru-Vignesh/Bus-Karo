import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import busReducer from "./redux/buses/busSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busReducer,
  },
});
