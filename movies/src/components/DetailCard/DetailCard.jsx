import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../../context/MoviesContext/MoviesContext";
import { useMovies } from "../../context/MoviesContext/MoviesContext";

const DetailCard = (/* {movies} */) => {
    
  const { id } = useParams();
  const { movies } = useContext(MovieContext);   


  const findMovie = movies.find((movie) => movie.id === parseInt(id));

if(findMovie){
   return (
    <div>
        <h1>{findMovie.title}</h1>
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

}

export default DetailCard 
