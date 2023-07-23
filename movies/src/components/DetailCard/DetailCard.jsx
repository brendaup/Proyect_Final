import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/MoviesContext/MoviesContext";
import "./DetailCard.css";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ReviewForm from "../ReviewForm/ReviewForm";
import axios from 'axios';

const DetailCard = () => {
  const { id } = useParams();
  const { dataMovies } = useContext(MovieContext);
  const { user, setUser } = useContext(AuthContext);
  const [findMovie, setFindMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [clickComments, setClickComments] = useState(false);
  const [clickReview, setClickReview] = useState(false);

  const [newComment, setNewComment] = useState(null);

 
  //Función manejadora para enviar el nuevo comentario a la API y actualizar la variable de estado 
 const handleCommentSubmit = (newComment) => {
    // Se actualiza el estado de los comentarios para mostrar el nuevo comentario
     setComments((prevComments) => [...prevComments, newComment]); 

    // Se realiza una solicitud PUT a la API para actualizar los comentarios de la película
    axios
    .put(`https://64af02ecc85640541d4e06ee.mockapi.io/movies/${findMovie.id}`, {
      ...findMovie,
      comments: [...findMovie.comments, newComment],
    })
    .then((response) => {
      console.log("Comment added:", response.data);
    })
    .catch((error) => {
      console.error("Error updating comments:", error);
    });
}; 

//Obentemos los detalles de la pelicula con el id y establecemos el estado findMovie
  useEffect(() => {
    const movie = dataMovies.find((movie) => movie.id === parseInt(id));
    setFindMovie(movie);
  }, [dataMovies, id]);

//Actualizamos el estado de los comentarios cuando el estado findMovie cambia  
  useEffect(() => {
    if (findMovie) {
      setComments(findMovie.comments.map((commentObj) => commentObj.comment));
    } else {
      setComments([]);
    }
  }, [findMovie]); 



  function commentsHandlerClick(clickVariable, setterClick) {
    setterClick(!clickVariable);
  }

  if (findMovie) {
    return (
      <div className="movie-content">
        <div className="movie-detail-card">
          <h1 className="movie-title">{findMovie.title}</h1>
          <img
            src={findMovie.poster_path}
            alt={findMovie.title}
            className="movie-poster"
          />
          <p className="movie-description">{findMovie.overview}</p>
          <p className="additional-info">
            Vote: {findMovie.vote_average}
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"></img>
          </p>

          <div
            onClick={() =>
              commentsHandlerClick(clickComments, setClickComments)
            }
            className="container-comments_length"
          >
            {" "}
            Comments ({comments.length}){" "}
          </div>
          <div>
            {clickComments ? (
              <div className="container_reviews">
                <div className="container_reviews-user">
                  <div>
                    <img
                      src="https://i.postimg.cc/4xrwf73K/hacker.png"
                      alt="userImg"
                    />
                     {comments.map((comment, index) => (
                      <div key={index}>
                        <p>User: {comment.user}</p>
                        <p>Rating: {comment.rating}</p>
                        <p>Comment: {comment.comment}</p>
                        <p>Date: {comment.date}</p>
                      </div>
                    ))} 
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}{" "}
          </div>
          <button
            id="btn_add-review"
            type="button"
            className="btn btn-primary"
            onClick={() => commentsHandlerClick(clickReview, setClickReview)}
          >
            Add review
          </button>
          <div>
            {" "}
            {clickReview ? (
              <div>
                {" "}
                <ReviewForm submitComment={handleCommentSubmit}  movieId={findMovie.id}  />{" "}
              </div>
            ) : (
              ""
            )}{" "}
          </div>
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
