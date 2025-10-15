import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Leave from "./components/Leave";

export default function App() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container py-4">
      <nav className="nav nav-pills mb-4">
        <NavLink className="nav-link" to="/profile">Profile</NavLink>
        <NavLink className="nav-link" to="/leave">Leave</NavLink>
        <button className="btn btn-danger ms-auto" onClick={logout}>Logout</button>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leave" element={<Leave />} />
      </Routes>
    </div>
  );
}
