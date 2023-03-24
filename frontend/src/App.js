import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminBuses from "./pages/Admin/AdminBuses";
import AdminHome from "./pages/Admin/AdminHome";
import AdminUsers from "./pages/Admin/AdminUsers";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminHome />} exact />
          <Route path="/admin/buses" element={<AdminBuses />} exact />
          <Route path="/admin/users" element={<AdminUsers />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/" element={<Home />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
