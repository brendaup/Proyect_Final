import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ReviewForm_style from "../ReviewForm/ReviewForm_style.css";
import axios from "axios";
import { MovieContext } from "../../context/MoviesContext/MoviesContext";
import { Navigate, useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { userName } = useContext(AuthContext);
  const { dataMoviesAll, setDataMovies, findMovie, setFindMovie, setComments } =
    useContext(MovieContext);
  const [formId, setFormId] = useState(findMovie.id);
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const shortDateFormat = `${day}/${month}/${year}`;
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormId(e.target.id);

    console.log("testings --> ", { name, comment });
    editItem();

    setName("");
    setComment("");
  };

  function editItem() {
    const apiEndpoint = "https://64af02ecc85640541d4e06ee.mockapi.io/movies/";
    const resourceId = formId;

    axios.get(`${apiEndpoint}/${resourceId}`).then((response) => {
      const userData = response.data;
      console.log(userData);

      const updatedFavorites = userData.comments || [];
      updatedFavorites.push({
        username: userName.username,
        avatar: userName.avatar,
        comment: comment,
        date: shortDateFormat,
      });

      const updatedObjectData = { ...userData, comments: updatedFavorites };

      axios
        .put(`${apiEndpoint}/${resourceId}`, updatedObjectData)

        .then((response) => {
          console.log(response.data);
          setComments(response.data.comments);
          setFindMovie(response.data);
          navigate(`/detail/${resourceId}`);
        })
        .catch((error) => {
          console.error("error -> ", error);
        });
    });
  }

  return (
    <div className="container_review">
      <form onSubmit={handleSubmit} id={findMovie.id}>
        <div>
          <label htmlFor="name">
            {" "}
            <p id="test"> You are logged as: </p>
          </label>
          <input
            type="text"
            id="name"
            value={userName.username}
            onChange={handleNameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            required
          />
        </div>
        <button type="submit" class="btn btn-warning">
          OK
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
