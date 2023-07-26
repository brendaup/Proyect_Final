import { createContext, useState, useContext } from "react";
import { loginRequest, registerRequest, updateUserR } from "../../api/auth";
import { useEffect } from "react";
import axios from "axios";

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
  const [refreshUser, setRefreshUser] = useState(false);

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
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const signin = async () => {
    try {
      const res = await loginRequest();
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserName("");
  };

  const updateUser = async (id, user) => {
    const res = await updateUserR(id, user);

    const api = axios.create({
      baseURL: "https://64af02ecc85640541d4e06ee.mockapi.io/users/",
    });
    async function fetchData() {
      try {
        const response = await api.get(`${id}`);
        setUserName(response.data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too many requests. Please try again later.");
        }
      }
    }
  };

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
        userName,
        updateUser,
        refreshUser,
        setRefreshUser,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
