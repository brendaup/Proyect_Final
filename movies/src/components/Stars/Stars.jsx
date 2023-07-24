import {useState} from 'react';
import { FaStar } from "react-icons/fa"
import  "./Stars.css"
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useMovies } from '../../context/MoviesContext/MoviesContext';



const Stars = ({movie}) => {


  const { userName, updateUser } = useAuth();
  const { updateMovieR, dataMovies } = useMovies();
  const[ score, setScore ] = useState(null);
  const [hover, setHover ] = useState(null);
  const voteUser = movie.vote_user;
 
  
  

  function handleClick (ev) {
  
    setScore(ev.target.value);
  
    const index = userName.favorites.findIndex((movie)=> movie.id == ev.target.name)
    const movieVote = dataMovies.find((mov) => mov.id == ev.target.name) 
    
    if(ev.target.value <=3){
      movieVote.vote_average = movieVote.vote_average - 1;
    }else{
      movieVote.vote_average = movieVote.vote_average + 1;
    }
    updateMovieR(ev.target.name, movieVote);

    const add_vote = userName;
    add_vote.favorites[index].vote_user = ev.target.value;
    if(ev.target.value <=3){
      add_vote.favorites[index].vote_average = add_vote.favorites[index].vote_average - 1;
    }else{
      add_vote.favorites[index].vote_average = add_vote.favorites[index].vote_average + 1;
    }
    updateUser(userName.id, add_vote);

  }


  return (
    <div className='div-Stars'>
    Mi calificación:
    {[...Array(5)].map((star,i) => {
      let scoreValue = i + 1;
      return(
        <label>
          <input
              type="radio"
              name={movie.id}
              value= {scoreValue}
              onClick= {handleClick}
              
            ></input>
            <FaStar 
              className = "star"
              color = {scoreValue <= (voteUser || hover) ? "#ffc107" : "#e4e5e9"}
              size={20}
              onMouseEnter={()=> setHover(scoreValue)}
              onMouseLeave={()=> setHover(null)}/>
        </label>
      )
    })}
    
   
      
    </div>
  )
}

export default Stars
