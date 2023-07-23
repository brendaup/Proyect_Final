import {useState} from 'react';
import { FaStar } from "react-icons/fa"
import  "./Stars.css"
import { useAuth } from '../../context/AuthContext/AuthContext';



const Stars = ({movie}) => {


  const { userName, updateUser } = useAuth();
  const[ score, setScore ] = useState(null);
  const [hover, setHover ] = useState(null);
  const voteUser = movie.vote_user;
 
  
  

  function handleClick (ev) {
  
    setScore(ev.target.value);
  
    const index = userName.favorites.findIndex((movie)=> movie.id == ev.target.name)

    const add_vote = userName;
    add_vote.favorites[index].vote_user = ev.target.value;
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
