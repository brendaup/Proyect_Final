import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/MoviesContext/MoviesContext";
import "./DetailCard.css";
import { AuthContext, useAuth } from "../../context/AuthContext/AuthContext";
import ReviewForm from "../ReviewForm/ReviewForm";

const DetailCard = () => {
  const { id } = useParams();
  const { dataMovies , findMovie, setFindMovie , comments, setComments} = useContext(MovieContext);
  const {user , setUser } = useContext(AuthContext);

  const [clickComments, setClickComments] = useState();
  const [clickReview, setClickReview] = useState();
  const { userName } = useAuth();


  useEffect(() => {
    const movie = dataMovies.find((movie) => movie.id === id);
   
    setFindMovie(movie);
   
  }, [dataMovies, id]);

  useEffect(() => {
    if (findMovie) {
      setComments(findMovie.comments.map((commentObj) => commentObj.comment));
    } else {
      setComments([]);
    }
  }, [findMovie]);

  function commentsHandlerClick(clickVariable , setterClick) {


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
             onClick={() => commentsHandlerClick(clickComments, setClickComments)}
            className="container-comments_length"
          >
            {" "}
            Comments ({comments ? comments.length : "loading"
            
            }){" "}
          </div>
          <div>
  {clickComments ? (
    <div className="container_reviews">
      {findMovie.comments.map((comment, index) => (
        <div key={index} className="container_reviews-user">
          <div>
            <img src={comment.avatar} alt="userImg" />
            {comment.username}
            <div> {comment.comment}</div>
          </div>
          <div>
            Date: {comment.date}
          </div>

        
        </div>
        
      ))}
      
    </div>
  ) : (
    ""
  )}
</div>
          {userName ?  <button id="btn_add-review" type="button" className="btn btn-custom"/* class="btn btn-primary" */ onClick={() => commentsHandlerClick(clickReview, setClickReview)} >Add review</button>  : <h3>You need to log in for leaving reviews , thank you</h3>}
          
          <div> {clickReview  ? <div> <ReviewForm /> </div> : " "}  </div></div> 
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
