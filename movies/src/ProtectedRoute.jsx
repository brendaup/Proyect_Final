
import Login from "./Pages/Login/Login";
import { useAuth } from "./context/AuthContext/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

import React from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated, userName } = useAuth();
  console.log(isAuthenticated);

  if (!isAuthenticated || (userName && parseInt(userName.role) !== 32)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


