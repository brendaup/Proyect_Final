import React from "react";
import { useContext, useState } from "react";
import {
  MovieContext,
  useMovies,
} from "../../context/MoviesContext/MoviesContext";
import MovieFollow_style from "../../components/MoviesFollow/MovieFollow_style.css";
import { useAuth } from "../../context/AuthContext/AuthContext";
import axios from "axios";

function MovieFollow() {
  const { userName, refreshUser, setRefreshUser } = useAuth();
  const { followMovies } = useContext(MovieContext);
  let followMoviesLength = "";
  const backgroundImg = "https://i.postimg.cc/Y2VRL6X1/movie.png";
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      >
        {" "}
        {followMoviesLength > 0 ? (
          <div className="indicator">
            <div className="noti_count" role="status">
              {followMoviesLength ? followMoviesLength : ""}
            </div>
            {isModalOpen && (
              <div className="modal indicator">
                <div className="container_modal">
                  <ul>
                    {userName.favorites.map((movie, index) => (
                      <li key={index}>
                        <div>
                          <i id="movie-icon" class="fa-solid fa-film"></i>
                          {movie.title} ({movie.genre}){" "}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default MovieFollow;
