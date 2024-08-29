import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute() {
  const token = Cookies.get("authToken");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
