import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/MoviesContext/MoviesContext";
import "./DetailCard.css";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ReviewForm from "../ReviewForm/ReviewForm";

const DetailCard = () => {
  const { id } = useParams();
  const { dataMovies } = useContext(MovieContext);
  const {user , setUser} = useContext(AuthContext);
  const [findMovie, setFindMovie] = useState(null);
  const [comments, setComments] = useState();
  const [clickComments, setClickComments] = useState();
  const [clickReview, setClickReview] = useState();


  useEffect(() => {
    const movie = dataMovies.find((movie) => movie.id === parseInt(id));
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
            Comments ({comments.length}){" "}
          </div>
          <div>
            {clickComments ? (
              <div className="container_reviews">
                {" "}
                <div className="container_reviews-user">
                  {" "}
                  <div>
                    {" "}
                    <img
                      src="https://i.postimg.cc/4xrwf73K/hacker.png"
                      alt="userImg"
                    />{" "}
                    {findMovie.comments.map((movie) => movie.user)}{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    Date : {findMovie.comments.map((movie) => movie.date)}{" "}
                  </div>
                </div>
                <div className="container_reviews-comments">
                  Comment
                  <div>{comments}</div>
                </div>
              </div>
            ) : (
              ""
            )}{" "}
          </div>
          <button id="btn_add-review" type="button" class="btn btn-primary" onClick={() => commentsHandlerClick(clickReview, setClickReview)} >Add review</button> 
          <div> {clickReview ? <div> <ReviewForm /> </div> : ""}  </div></div> 
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
