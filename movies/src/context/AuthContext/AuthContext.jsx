import { createContext, useState, useContext } from "react";
import { loginRequest, registerRequest } from "../../api/auth";
import { useEffect } from "react";



export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  

   // Después de 5 segundos limpiamos los errores
   useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
    
      console.log(user);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async () => {
    try {
      const res = await loginRequest();
      setUser(res.data);
      
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Si el usuario está logueado, establecer el nombre de usuario en el estado
    if (user) {
      setUserName(user.name);
    } else {
      setUserName(""); // Si el usuario no está logueado, establecer el nombre de usuario como una cadena vacía
    }
  }, [user]);


  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        errors,
        logout,
        setIsAuthenticated,
        isAuthenticated,
        setUserName,
        userName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
