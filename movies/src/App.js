import logo from "./logo.svg";
import "./App.css";
import { MovieContext } from "./context/MoviesContext/MoviesContext";
import { useState } from "react";
import Movies from "./api/movies";
import Filter from "./components/Filter/Filter";
import DataMovies from "./components/MovieCard/DataMovies";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import { AuthProvider } from "./context/AuthContext";

function App() {
  const [dataMovies, setDataMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);

  //Follow module

  const [followMovies, setFollowMovies] = useState([]);

  // PRUEBA

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register></Register>} />
            <Route path="/login" element={<Login></Login>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <MovieContext.Provider
        value={{
          dataMovies,
          setDataMovies,
          followMovies,
          setFollowMovies,
          originalMovies,
        }}
      >
        <Movies />

        <Filter />
        <DataMovies />
      </MovieContext.Provider>
    </div>
  );
}

export default App;
