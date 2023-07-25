import React from "react";
import { useContext, useState } from "react";
import { MovieContext, useMovies } from "../../context/MoviesContext/MoviesContext";
import MovieFollow_style from "../../components/MoviesFollow/MovieFollow_style.css";
import { useAuth } from "../../context/AuthContext/AuthContext";
import axios from "axios";

function MovieFollow() {
  const {userName, refreshUser, setRefreshUser } = useAuth()
  const { followMovies } = useContext(MovieContext);
  let followMoviesLength = '';
  const backgroundImg = 'https://i.postimg.cc/Y2VRL6X1/movie.png';
  const [isModalOpen, setIsModalOpen] = useState(false);


  /*contexto para llamar la función que elimina peliculas Follow */
  const { removeMovieFromFollowed } = useMovies();




  if (userName.favorites) {
    followMoviesLength = userName.favorites.length;
  } else {
    followMoviesLength = 0;
  }
  const handleMouseEnter = () => {
    setIsModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsModalOpen(false);
  };

  /*Llamo a la función para eliminar la película */
  const handleRemoveMovie = (movieId) => {
    removeMovieFromFollowed(movieId); 
  };

  return (
    <div className="container_movieFollow">
      <div> </div>
 
      <div
        className="base"
        style={{
          backgroundImage: `
          url(${
            backgroundImg
              ? backgroundImg
              : "https://i.postimg.cc/Y2VRL6X1/movie.png"
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      > {followMoviesLength > 0 ? (
        <div className="indicator">
          <div className="noti_count" role="status">
            {followMoviesLength ? followMoviesLength : ''  }
          </div>
          {isModalOpen && (
            <div className="modal indicator">
              <div className="container_modal">
                <ul>
                  {userName.favorites.map((movie, index) => (
                    <li key={index}>
                      
                      <p>
                     
                        {movie.title} ({movie.genre})  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
  <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"/>
</svg>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>   ) : ""  }
      </div>
    </div>
  );
}

export default MovieFollow;
