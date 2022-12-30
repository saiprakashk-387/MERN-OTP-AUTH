import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Drawerlayout from "../Components/Layout/DrawerLayout";
import AdminDashboard from "../Components/Pages/AdminDashboard";
import Home from "../Components/Pages/Home";

const Router = () => {
  return (
    <div>
         <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Drawerlayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
