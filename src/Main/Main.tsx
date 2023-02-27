import "./Main.css";
import MovieIcon from "../assets/movie.svg";
import AllMoviesSeries from "../assets/allMovieTvSeries.svg";
import OnlyMovies from "../assets/icon-nav-movies.svg";
import OnlyTvSeries from "../assets/icon-nav-tv-series.svg";
import BookmarkedMoviesSeries from "../assets/icon-nav-bookmark.svg";
import searchIcon from "../assets/icon-search.svg";
import movie2 from "../assets/thumbnails/beyond-earth/trending/small.jpg";
import bookMarkIcon from "../assets/icon-bookmark-empty.svg";
import bookMarkIconFull from "../assets/icon-bookmark-full.svg";
import movieType from "../assets/movieType.svg";
import data from "../data.json";
import { useState } from "react";
import Recommended from "../Recommended/Recommended";

const Main = () => {
  const [movies, setMovies] = useState(data);
  const [trendingLeft, setTrendingLeft] = useState(20);
  const [bookMarked, setBookMarked] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleMoveTrendingLeft = () => {
    setTrendingLeft(trendingLeft - 80);
  };

  const makeBookMarked = () => {
    setBookMarked(!bookMarked);
  };

  const readInputValue = (e: any) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(inputValue.toLowerCase())
  );

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
        <div className="profilePhotoBox"></div>
      </div>
      <div className="searchInputBox">
        <img className="searchIcon" src={searchIcon} />
        <input
          type={"text"}
          className="searchInput"
          placeholder="Search for movies or TV series"
          onChange={readInputValue}
        />
      </div>
      <a className="trendingHeadingText">Trending</a>

      <div
        className="trendingContainer"
        style={{ marginLeft: `${trendingLeft}px` }}
        onClick={handleMoveTrendingLeft}
      >
        {movies
          .filter((movie) => movie.isTrending)
          .map((movie) => (
            <div className="trendingBox">
              <div className="trendingBookMarkBox">
                {bookMarked ? (
                  <img
                    className="trendingBookMarkIcon"
                    src={bookMarkIcon}
                    onClick={makeBookMarked}
                  />
                ) : (
                  <img
                    className="trendingBookMarkIcon"
                    src={bookMarkIconFull}
                    onClick={makeBookMarked}
                  />
                )}
              </div>
              <img
                className="tredingMovieImage"
                src={movie.thumbnail.trending?.small}
              />
              <div className="descriptionForTrendingBox">
                <div className="trendingUpperDescription">
                  <a className="trendingYear">{movie.year}</a>
                  <div className="trendingDot"></div>
                  <div className="trendingMovieTypeSmallBox">
                    <img src={movieType} className="trendingIconForType" />
                    <a className="trendingMovieTypeText">{movie.category}</a>
                  </div>
                </div>
                <a className="movieTvShowTitle">{movie.title}</a>
                <div className="tredingMovieClass">
                  <a className="tredingMovieClassText">{movie.rating}</a>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Recommended
        movies={movies}
        setMovies={setMovies}
        readInputValue={readInputValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        filteredMovies={filteredMovies}
      />
    </div>
  );
};

export default Main;
