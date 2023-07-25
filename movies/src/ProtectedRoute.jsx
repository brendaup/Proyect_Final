
import Login from "./Pages/Login/Login";
import { useAuth } from "./context/AuthContext/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

import React from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated, userName } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


