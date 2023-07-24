
import { MovieContext } from '../../context/MoviesContext/MoviesContext';
import React , { useContext, useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext/AuthContext';
import ModeratorPanel_style from "../../components/Moderator-Panel/ModeratorPanel_style.css";
import axios from 'axios';


function ModeratorPanel() {


    const { dataMovies, setDataMovies, followMovies, setFollowMovies } = useContext(MovieContext);
  const { userName, isAuthenticated, user, setUser, updateUser } = useAuth();
   const [dataPushed, setDataPushed] = useState(false);
   const [dataAdded , setDataAdded] = useState();
   const apiEndpoint = 'https://64af02ecc85640541d4e06ee.mockapi.io/movies/';
   const[reviewsSearcher, setReviewsSearcher] = useState([]);
   const [dataDeleted, setDataDeleted] = useState()
  

 
   
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
  
 
  
    axios.post(apiEndpoint, formData).then((response) => {
        console.log(response);
        setDataPushed(true);
        setDataAdded(response.data)
    
      })
      .catch((error) => {
        console.error(error);
      });
  };

 
  function handleSearch (e) {
    let search = e.target.value;
    const searchQuery = search.toLowerCase();
    const filteredMovies = dataMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery)
    );
    setReviewsSearcher(filteredMovies);
   

  }



  function editReviews(commentIndex) {
    const api = 'https://64af02ecc85640541d4e06ee.mockapi.io/movies';
    let pushForApi = [];
    const movieId = reviewsSearcher.map((item) => item.id);


    let goApi = reviewsSearcher.map((movie)=> movie.comments);
   
    const indexToDelete = commentIndex; 

    //  index is valid >?
    if (indexToDelete >= 0 && indexToDelete < goApi[0].length) {
      goApi[0].splice(indexToDelete, 1); 
    }

 
    pushForApi.push(goApi[0])


    const updatedObjectData = { comments: goApi[0]}; 

    axios.put(`${apiEndpoint}/${movieId}`, updatedObjectData)
  
    .then(response => {
      console.log(response.data);
      setReviewsSearcher(response.data)
      setDataDeleted("Review deleted succesfully!")
      
    })
    
  









}



  return (
    <>

<div className='check_reviews'>
  <h4>  Review searcher </h4>
  <input onChange={handleSearch} placeholder='Search by Title of movies'></input>

  {Array.isArray(reviewsSearcher) && reviewsSearcher.length > 0 ? (
    <div>
      {reviewsSearcher.map((movie) => (
        <div key={movie.id}>
          <div>ID: {movie.id}</div>
          <div>Title: {movie.title}</div>
          <div className='container-reviews-byuser'>
            {Array.isArray(movie.comments) && movie.comments.length > 0 ? (
              movie.comments.map((comment, index) => (
                <div className='container_showReviews' key={index}>
                  <p>
                    Comment by {comment.username}: {comment.comment}
                    <button
                      onClick={() => editReviews(index)}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    ></button>
                  </p>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : 
  ''}
      <div> <h3 className='succesully'>{dataDeleted ? dataDeleted : ''} </h3></div> 
    
</div>
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
          khkhhk
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

    <div className='data_succesfuly'> {dataPushed ? <div>
        <img src='https://i.postimg.cc/rwy05xLy/successful.png' alt="img ok" />
     <h2>Movie added succesully! </h2>
    <p> Title:  {dataAdded.title} </p>
    <p className='id_movie-pushed'> ID: {dataAdded.id} </p>
    <p> Release date : {dataAdded.release_date} </p>
    <img src={dataAdded.poster_path} alt="poster img " />  </div> : " no "}</div>
    </>
  );
}

export default ModeratorPanel
