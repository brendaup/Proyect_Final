
import { MovieContext } from "./context/MoviesContext/MoviesContext";
import { useState } from "react";
import Movies from "./api/movies";
import Filter from "./components/Filter/Filter";
import DataMovies from "./components/MovieCard/DataMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { MoviesProvider } from "./context/MoviesContext/MoviesContext";
import  Header  from "./components/Header/Header"
import  Footer  from "./components/Footer/Footer"
import  ProtectedRoute  from "./ProtectedRoute";
import  Profile  from "./Pages/Profile/Profile"
import  FormMovies  from "./Pages/FormMovies/FormMovies"


function App() {

  return (
    <AuthProvider>

      <MoviesProvider>
        <BrowserRouter>
         <Header />
         <Filter />
          <Routes>
            <Route path="/" element={<DataMovies />} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/add-movie" element={<FormMovies></FormMovies>} />
              <Route path="/movies/:id" element={<FormMovies></FormMovies>} />
              <Route path="/profile" element={<Profile></Profile>} />
              
            </Route>
          </Routes>
         
          <Footer />
        </BrowserRouter>
        <Movies />
        
      </MoviesProvider>
      
    </AuthProvider>
  );
}

export default App;
