import { useAuth } from "../../context/AuthContext/AuthContext";
import { useMovies } from "../../context/MoviesContext/MoviesContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Stars from "../../components/Stars/Stars";
import { FaStar } from "react-icons/fa"


const Profile = () => {
  const { user, userName, updateUser } = useAuth();
  const { dataMovies } = useMovies();
  const [paramYoutube, setParamYoutube] = useState();
  const [youTubeUrl, setYouTubeUrl] = useState(
    "https://www.youtube.com/results?search_query="
  );
  const navigate = useNavigate();
  const findUser = user.find((user) => user.id == userName.id);

  function getParamYoutube(event) {
    let dataFilter = dataMovies.filter((param) => param.id == event.target.id);
    setParamYoutube(dataFilter.map((data) => data.title));
  }


 function handleOnClick(event) {
    const findUser = user.find((user) => user.id == userName.id);
    const index = userName.favorites.findIndex(
      (movie) => movie.id == event.target.id
    );
    findUser.favorites.splice(index, 1);
    updateUser(userName.id, findUser);
    navigate("/profile");
    
  }

  useEffect(() => {
    const newYouTubeUrl = `https://www.youtube.com/results?search_query=${paramYoutube}`;
    setYouTubeUrl(newYouTubeUrl);
    if (
      newYouTubeUrl === "https://www.youtube.com/results?search_query=undefined"
    ) {
      console.log("error getting link for youtube :)");
    } else {
      window.open(newYouTubeUrl, "_blank");
    }
  }, [paramYoutube]);




  return (
    <>
      <div className="container_list">
        {findUser.favorites
          ? findUser.favorites.map((movie) => (
              <div key={movie.id} className="container_list_box-background">
                <div>
                  <img src={movie.poster_path} alt={movie.title} />
                </div>
                <div className="container_list-rate">
                  {" "}
                  <FaStar 
                     className = "star"
                     color = {"#ffc107"}
                     size={20}/>
                  {" "}
                  {movie.vote_average}
                </div>
                
                <Stars movie= {movie} />
                
                
                <div>{movie.title} </div>

                <div className="container_list_follow">
                  <div id={movie.id} onClick={handleOnClick}>
                    {" "}
                    <div key={movie.id} id={movie.id}>
                      {"Followed - "}
                    </div>
                  </div>
                </div>
                <div className="container_list-youtube">
                  <img
                    onClick={getParamYoutube}
                    src="https://i.postimg.cc/B6hMMSTw/youtube.png"
                    id={movie.id}
                    alt="img-youtub"
                  />
                </div>
              </div>
            ))
          : ""}
        <div className="container-spinner">
          {findUser.favorites.length < 1 ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
