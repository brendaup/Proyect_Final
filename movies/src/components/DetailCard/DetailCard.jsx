import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../context/MoviesContext/MoviesContext";
import "./DetailCard.css"

const DetailCard = () => {
  const { id } = useParams();
  const { dataMovies } = useContext(MovieContext);

  const findMovie = dataMovies.find((movie) => movie.id === parseInt(id));

  if (findMovie) {
    return (
      <div className="movie-content">
      <div className="movie-detail-card">
        <h1 className="movie-title">{findMovie.title}</h1>
        <img src={findMovie.poster_path} alt={findMovie.title} className="movie-poster"/>
        <p className="movie-description">{findMovie.overview}</p>
        <p className="additional-info">
            Vote: {findMovie.vote_average}
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"></img>
          </p>
      </div>
      </div>
    );
  } else {
    return (
      <div className="not-found">
        <img
          src="https://img.freepik.com/vector-premium/icono-error-minimo-moderno-no-encontrado-vaya-pagina-no-encontrada-404-error-pagina-no-encontrada-concept_599740-716.jpg"
          alt="not-found"
        />
      </div>
    );
  }
};

export default DetailCard;
