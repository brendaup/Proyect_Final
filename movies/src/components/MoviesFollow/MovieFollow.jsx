import React from 'react';
import { useContext, useState } from 'react'
import { MovieContext } from '../../context/MoviesContext/MoviesContext'
import MovieFollow_style from '../../components/MoviesFollow/MovieFollow_style.css'


function MovieFollow() {
  const {followMovies} = useContext(MovieContext) ;


const followMoviesLength = followMovies.length;
const backgroundImg = followMovies.map((img)=> img.poster_path).pop();

const [isModalOpen, setIsModalOpen] = useState(false);

const handleMouseEnter = () => {
  setIsModalOpen(true);
};

const handleMouseLeave = () => {
  setIsModalOpen(false);
};






return (
  <div className='container_movieFollow'>
 <div>  </div>

  




<div className='base' style={{
backgroundImage: `url(${backgroundImg ? backgroundImg : "https://i.postimg.cc/02DC0j08/popcorn.png"})`,
backgroundRepeat: 'no-repeat',
backgroundSize: 'cover',
}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
<div className='indicator'>
  <div className='noti_count' role='status'>{followMoviesLength}</div>
  {isModalOpen && (
    <div className="modal indicator">
      <ul>
        {followMovies.map((movie) => (
          <li>{movie.title} ({movie.genre})</li>
        ))}
      </ul>
    </div>
  )}
  </div>
</div>

</div>
 
)
}

export default MovieFollow