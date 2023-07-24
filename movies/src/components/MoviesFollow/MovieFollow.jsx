import React from "react";
import { useContext, useState } from "react";
import { MovieContext, useMovies } from "../../context/MoviesContext/MoviesContext";
import MovieFollow_style from "../../components/MoviesFollow/MovieFollow_style.css";

function MovieFollow() {
  const { followMovies } = useContext(MovieContext);
  const followMoviesLength = followMovies.length;
  const backgroundImg = 'https://i.postimg.cc/Y2VRL6X1/movie.png';
  const [isModalOpen, setIsModalOpen] = useState(false);

  /*contexto para llamar la función que elimina peliculas Follow */
  const { removeMovieFromFollowed } = useMovies();
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
      > {followMovies.length > 0 ? (
        <div className="indicator">
          <div className="noti_count" role="status">
            {followMoviesLength}
          </div>
          {isModalOpen && (
            <div className="modal indicator">
              <div className="container_modal">
                <ul>
                  {followMovies.map((movie, index) => (
                    <li key={index}>
                      <p>
                        <button type="button" class="btn btn-danger" onClick={() => handleRemoveMovie(movie.id)}>
                          X
                        </button>{" "}
                        {movie.title} ({movie.genre})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>   ) : ''  }
      </div>
    </div>
  );
}

export default MovieFollow;
