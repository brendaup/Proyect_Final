
import { MovieContext } from '../../context/MoviesContext/MoviesContext';
import React , { useContext, useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext/AuthContext';
import ModeratorPanel_style from "../../components/Moderator-Panel/ModeratorPanel_style.css";
import axios from 'axios';


function ModeratorPanel() {


    const { dataMovies, setDataMovies, followMovies, setFollowMovies } = useContext(MovieContext);
  const { userName, isAuthenticated, user, setUser, updateUser } = useAuth();
   

 
   
  const [formData, setFormData] = useState({
    "adult": false,
    "backdrop_path": "",
    "genre": "",
    "original_language": "",
   
    "overview": "",
    "popularity": 2459.93,
    "poster_path": "",
    "release_date": "",
    "title": "",
    "video": false,
    "vote_average": null,
    "vote_count": null,
    "Favorite": true,
    "vote_user": null
  });
 


 
  const handleChange = (event) => {



    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
   
  
   console.log(formData)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const apiEndpoint = 'https://64af02ecc85640541d4e06ee.mockapi.io/movies/';
  
    axios.post(apiEndpoint, formData).then((response) => {
        console.log(response);
        console.log(response.data);
        // Handle success response here, if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error response here, if needed
      });
  };

 
  return (
    <div className='container_form' >
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="overview">Overview</label>
        <textarea
          id="overview"
          name="overview"
          value={formData.overview}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder=' Action / Drama / Comedy'
        />
      </div>
      <div>
        <label htmlFor="release_date">Release Date</label>
        <input
          type="date"
          id="release_date"
          name="release_date"
          value={formData.release_date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="original_language">Original Language</label>
        <input
          type="text"
          id="original_language"
          name="original_language"
          value={formData.original_language}
          onChange={handleChange}
          placeholder=' en / es / it'
        />
      </div>

      <div>
        <label htmlFor="vote_average">Vote Average(Estimation)</label>
        <input
          type="number"
          id="vote_average"
          name="vote_average"
          value={formData.vote_average}
          onChange={handleChange}
          placeholder=' 1 ~ 10'
        />
      </div>

        <div>
        <label htmlFor="poster_path">Poster Image</label>
        <input
          type="text"
          id="poster_path"
          name="poster_path"
          value={formData.poster_path}
          onChange={handleChange}
          placeholder='image url'
        />
      </div>
    
      <div>
        <label htmlFor="adult">Adult:</label>
        <input
          type="checkbox"
          id="adult"
          name="adult"
          checked={formData.adult}
          onChange={handleChange}
        />
      </div>
      {/* Add more fields as needed */}
      <button type="submit">Add movie</button>
    </form>
    </div>
  );
}

export default ModeratorPanel
