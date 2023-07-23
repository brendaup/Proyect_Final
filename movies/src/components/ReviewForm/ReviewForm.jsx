import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import ReviewForm_style from "../ReviewForm/ReviewForm_style.css";
import axios from "axios"

const ReviewForm = () => {
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
  
      // send form to api users, / not done 
      console.log('testings --> ', { name, rating, comment });
  
      // Reset the form after sub mit
      setName('');
      setRating('');
      setComment('');
    };

    function editItem() {
   


      const apiEndpoint = 'https://64af02ecc85640541d4e06ee.mockapi.io/users/';
      const resourceId = '1'; 
      const updatedObjectData = {
        "favorites": [{Lala:"lala" , Commoents:"test,test"}]
      };
      
      axios.put(`${apiEndpoint}/${resourceId}`, updatedObjectData)
        .then(response => {
          
          console.log('Object updated successfully:', response.data);
        })
        .catch(error => {
          
          console.error('Error updating object:', error);
        });
        }




  
    return (

       
        <div className="container_review" >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> <p id="test"> Name: (Please LogIn,test zone)</p></label>
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