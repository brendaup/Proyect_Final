
import { MovieContext, MoviesProvider } from "./context/MoviesContext/MoviesContext";
import { useState, useContext, StrictMode } from "react";
import Movies from "./api/movies";
import Filter from "./components/Filter/Filter";
import DataMovies from "./components/MovieCard/DataMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { AuthProvider, useAuth } from "./context/AuthContext/AuthContext";
import  Header  from "./components/Header/Header"
import  Footer  from "./components/Footer/Footer"
import  ProtectedRoute  from "./ProtectedRoute";
import  Profile  from "./Pages/Profile/Profile"
import DetailCard from "./components/DetailCard/DetailCard";
import ModeratorPanel from "./components/Moderator-Panel/ModeratorPanel";
import Visitors from "./components/MovieCard/Visitors/Visitors";


function App() {
 

  return (
   <> 
  
    <AuthProvider>
  
      <MoviesProvider>
        <BrowserRouter>
         
         <Header />
    
          <Routes>
            <Route path="/" element={<DataMovies />} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/detail/:id" element={<DetailCard   />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<ModeratorPanel /> } /> 
              <Route path="/profile" element={<Profile></Profile>} />
            </Route>
          </Routes>
          
          <Footer />

        </BrowserRouter>
         
         <Movies /> 
       
      </MoviesProvider>
       
    </AuthProvider>
    </>
   
  );
}

export default App;
