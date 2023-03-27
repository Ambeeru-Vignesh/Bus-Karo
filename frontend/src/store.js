import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import busReducer from "./redux/buses/busSlice";
import bookingReducer from "./redux/bookings/bookingSlice";
import alertSlice from "./redux/alertSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busReducer,
    bookings: bookingReducer,
    alerts: alertSlice,
  },
});
