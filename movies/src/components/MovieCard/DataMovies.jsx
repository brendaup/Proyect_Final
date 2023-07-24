import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import DataMovies_style from "../../components/MovieCard/DataMovies_style.css";
import MovieFollow from "../MoviesFollow/MovieFollow";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
  MovieContext,
  useMovies,
} from "../../context/MoviesContext/MoviesContext";
import { Link } from "react-router-dom";
import GenreFilter from "../Filter/GenreFilter";
import axios from "axios";

function DataMovies() {
  const { dataMovies, setDataMovies, followMovies, setFollowMovies } =
    useContext(MovieContext);
  const { userName, isAuthenticated, user, setUser, updateUser } = useAuth();
  const [paramYoutube, setParamYoutube] = useState();
  const [youTubeUrl, setYouTubeUrl] = useState(
    "https://www.youtube.com/results?search_query="
  );
  const [showMore, setShowMore] = useState(10);
  const [showLoading, setShowLoading] = useState(true);
  const [followBtn, setFollow] = useState(false);
  const updatedDataMovies = dataMovies.map((movie) => {
    return {
      ...movie,
      favorite: false,
      favoriteTxt: "Follow + ",
      noFavoriteTxt: "Followed - ",
    };
  });

  function getParamYoutube(event) {
    let dataFilter = dataMovies.filter((param) => param.id == event.target.id);
    setParamYoutube(dataFilter.map((data) => data.title));
  }

  //Movie follow module

  function addFollow(event) {
    let dataFilter = dataMovies.filter((param) => param.id == event.target.id);

    const isAlreadyAdded = followMovies.some(
      (movie) => movie.id === dataFilter[0].id
    );

    if (isAlreadyAdded) {
      // console.log("Already exists");
    } else {
      const newFollowMovies = followMovies.concat(dataFilter);
      setFollowMovies(newFollowMovies);
    }
  }

  function clickHandlerFollowBtn(event) {
    const id = event.target.id;

    const dataFilter = dataMovies.find((movie) => movie.id == id);

    if (dataFilter && isAuthenticated && userName) {
      const findUser = user.find((user) => user.id == userName.id);
      const isMatch = findUser.favorites.find((movie) => movie.id == id);
      if (!isMatch) {
        findUser.favorites.push(dataFilter);
        const id = findUser.id;
        updateUser(id, findUser);
      }

      dataFilter.Favorite = true;

      const index = dataMovies.findIndex((movie) => movie.id == id);

      if (index !== -1) {
        dataMovies[index] = dataFilter;
      }
    }
  }

  useEffect(() => {
    const newYouTubeUrl = `https://www.youtube.com/results?search_query=${paramYoutube}`;
    setYouTubeUrl(newYouTubeUrl);
    if (
      newYouTubeUrl === "https://www.youtube.com/results?search_query=undefined"
    ) {
      console.log("");
    } else {
      window.open(newYouTubeUrl, "_blank");
    }
  }, [paramYoutube]);

  // limit to 10 items per page

  dataMovies.length = showMore;
  function showListLimit() {
    const newShowMore = showMore + 10;
    setShowMore(newShowMore);
    dataMovies.length = newShowMore;
    axios
      .get("https://64af02ecc85640541d4e06ee.mockapi.io/movies")
      .then((response) => {
        setDataMovies(response.data);
      });
  }

  setTimeout(() => {
    setShowLoading(false);
  }, 2000);

  return (
    <>
      <div className="filter-container">
        <GenreFilter />
      </div>

      <div className="container_list">
        {dataMovies
          ? dataMovies.map((movie) => (
              <div key={movie.id} className="container_list_box-background">
                <div>
                  <Link to={`/detail/${movie.id}`}>
                    <img src={movie.poster_path} alt={movie.title} />
                  </Link>
                </div>
                <div className="container_list-rate">
                  {" "}
                  <img
                    src="https://i.postimg.cc/qRCzZQyV/star.png"
                    alt="star"
                  />{" "}
                  {movie.vote_average}
                </div>
                <div>{movie.title} </div>

                {userName ? (
                  <div className="container_list_follow">
                    <div id={movie.id} onClick={addFollow}>
                      {" "}
                      <div
                        onClick={clickHandlerFollowBtn}
                        key={movie.id}
                        id={movie.id}
                      >
                        {" "}
                        {movie.favorite ? "Followed -  " : " Follow + "}{" "}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
          {showLoading ? (
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
      {showLoading ? (
        ""
      ) : (
        <div className="container-show-limit-btn">
          <div></div>

          <button
            id="btn_show-limit"
            type="button"
            class="btn btn-primary btn-lg btn-block"
            onClick={showListLimit}
          >
            SHOW MORE MOVIES
          </button>
          <div></div>
        </div>
      )}
    </>
  );
}
export default DataMovies;
