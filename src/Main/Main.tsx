import "./Main.css";

import MovieIcon from "../assets/movie.svg";
import AllMoviesSeries from "../assets/allMovieTvSeries.svg";
import OnlyMovies from "../assets/icon-nav-movies.svg";

import OnlyTvSeries from "../assets/icon-nav-tv-series.svg";

import BookmarkedMoviesSeries from "../assets/icon-nav-bookmark.svg";

const Main = () => {
  return (
    <div className="mainContainer">
      <div className="selectMovieTypeBox">
        <img src={MovieIcon} className="selectType" />
        <div className="movieTypeBox">
          <img className="selectType" src={AllMoviesSeries} />
          <img className="selectType" src={OnlyMovies} />
          <img className="selectType" src={OnlyTvSeries} />
          <img className="selectType" src={BookmarkedMoviesSeries} />
        </div>
      </div>
    </div>
  );
};

export default Main;
