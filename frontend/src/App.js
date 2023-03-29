import React from "react";
import "@stripe/stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminBuses from "./pages/Admin/AdminBuses";
import AdminHome from "./pages/Admin/AdminHome";
import AdminUsers from "./pages/Admin/AdminUsers";
import BookNow from "./pages/BookNow";
import CheckoutFail from "./pages/CheckoutFail";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminHome />} exact />
          <Route path="/admin/buses" element={<AdminBuses />} exact />
          <Route
            path="/admin/buses/:pageNumber"
            element={<AdminBuses />}
            exact
          />
          <Route path="/admin/users" element={<AdminUsers />} exact />
          <Route path="/checkout-success" element={<CheckoutSuccess />} exact />
          <Route path="/checkout-fail" element={<CheckoutFail />} exact />

          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/page/:pageNumber" element={<Home />} exact />
          <Route path="/book-now/:id" element={<BookNow />} exact />
          <Route path="/bookings" element={<Bookings />} exact />
          <Route path="/" element={<Home />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
