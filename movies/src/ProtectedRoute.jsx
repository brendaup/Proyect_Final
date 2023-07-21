
import { useAuth } from "./context/AuthContext/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {

    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated);
    
    if(!isAuthenticated) return <Navigate to = "/login" replace />

  return <Outlet></Outlet>
}

export default ProtectedRoute
