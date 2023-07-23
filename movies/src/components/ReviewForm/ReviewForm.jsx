import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ReviewForm_style from "../ReviewForm/ReviewForm_style.css";

const ReviewForm = ({submitComment, movieId}) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
     const {userName} = useContext(AuthContext); 
    console.log(userName)
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleRatingChange = (e) => {
      setRating(e.target.value);
    };
  
    const handleCommentChange = (e) => {
      setComment(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Preparo nuevo objeto del nuevo comentario 
      const newComment = {
        name: userName,
        rating,
        comment,
        date: new Date().toLocaleDateString(), 
      };
  
    //Llamo a la función del componente principal para enviar el comentario
      submitComment(newComment);
  
      //Reseteo formulario después de darle a enviar
      setName('');
      setRating('');
      setComment('');
    };
  

    return (
       
        <div className="container_review" >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> 
            <p id="test"> Name: {userName ? userName : "(Please LogIn, test zone)"}</p>
          </label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={handleNameChange}
            required
          />

          
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            required
          >
            <option value="">Select rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
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
        <button type="submit" class="btn btn-warning">OK</button>
      </form>
      </div>
    
    );
  };
  
  export default ReviewForm;
  
