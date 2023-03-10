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
import activeAllMovies from "../assets/activeAllMovies.svg";
import activeMovies from "../assets/activeMovies.svg";
import activeTvSeries from "../assets/activeTVSeries.svg";
import activeBookmarkedMovies from "../assets/activeBookMark.svg";
import TvSeries from "../TvSeries/TvSeries";
import Bookmarked from "../Bookmarked/Bookmarked";
import data from "../data.json";
import { useState, useRef } from "react";
import Recommended from "../Recommended/Recommended";
import Movies from "../Movies/Movies";

const Main = () => {
  const [movies, setMovies] = useState(data);
  const [trendingLeft, setTrendingLeft] = useState(20);
  const [bookMarked, setBookMarked] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [showAllMovies, setShowAllMovies] = useState(true);
  const [showOnlyMovies, setShowOnlyMovies] = useState(false);
  const [showOnlyTvSeries, setShowOnlyTvSeries] = useState(false);
  const [showBookmarkedMoviesSeries, setShowBookmarkedMoviesSeries] =
    useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const trendingContainerRef = useRef(null);
  const [logout, setLogout] = useState(false);
  const [translateX, setTranslateX] = useState("translateX(0px)");

  const handleMoveTrendingLeft = () => {
    if (trendingLeft > 0) {
      setTrendingLeft(trendingLeft - 340);
      setTranslateX(`translateX(-${trendingLeft + 180}px)`);
    } else if (trendingLeft < 40) {
      setTrendingLeft(+10);
      setTranslateX(`translateX(-${trendingLeft + 180}px)`);
    }
  };

  const handleMoveTrendingRight = () => {
    if (trendingLeft < 50) {
      setTrendingLeft(trendingLeft + 180);
      setTranslateX(`translateX(-${trendingLeft - 180}px)`);
    }
  };

  const handleTouchStart = (e: any) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      requestAnimationFrame(handleMoveTrendingLeft);
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right
      requestAnimationFrame(handleMoveTrendingRight);
    }
  };

  const makeBookMarked = (id: string) => {
    setMovies((prevMovies) => {
      const newMovies = prevMovies.map((movie) => {
        if (`recommended_${movie.id}` === id) {
          return { ...movie, isBookmarked: !movie.isBookmarked };
        } else {
          return movie;
        }
      });
      return newMovies;
    });
  };

  const readInputValue = (e: any) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showAllMoviesClick = () => {
    setShowAllMovies(true);
    setShowOnlyMovies(false);
    setShowOnlyTvSeries(false);
    setShowBookmarkedMoviesSeries(false);
  };

  const showOnlyMoviesClick = () => {
    setShowAllMovies(false);
    setShowOnlyMovies(true);
    setShowOnlyTvSeries(false);
    setShowBookmarkedMoviesSeries(false);
  };

  const showOnlyTvSeriesClick = () => {
    setShowAllMovies(false);
    setShowOnlyMovies(false);
    setShowOnlyTvSeries(true);
    setShowBookmarkedMoviesSeries(false);
  };

  const showBookmarkedMoviesSeriesClick = () => {
    setShowAllMovies(false);
    setShowOnlyMovies(false);
    setShowOnlyTvSeries(false);
    setShowBookmarkedMoviesSeries(true);
  };

  const LogoutClick = () => {
    setLogout(!logout);
  };

  const Loggedout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="desktopScroll">
      <div className="mainContainer">
        <div className="selectMovieTypeBox">
          <img src={MovieIcon} className="selectType" />
          <div className="movieTypeBox">
            {showAllMovies ? (
              <img
                className="selectType"
                src={activeAllMovies}
                onClick={showAllMoviesClick}
              />
            ) : (
              <img
                className="selectType"
                src={AllMoviesSeries}
                onClick={showAllMoviesClick}
              />
            )}
            {showOnlyMovies ? (
              <img
                className="selectType"
                src={activeMovies}
                onClick={showOnlyMoviesClick}
              />
            ) : (
              <img
                className="selectType"
                src={OnlyMovies}
                onClick={showOnlyMoviesClick}
              />
            )}
            {showOnlyTvSeries ? (
              <img
                className="selectType"
                src={activeTvSeries}
                onClick={showOnlyTvSeriesClick}
              />
            ) : (
              <img
                className="selectType"
                src={OnlyTvSeries}
                onClick={showOnlyTvSeriesClick}
              />
            )}
            {showBookmarkedMoviesSeries ? (
              <img
                className="selectType"
                src={activeBookmarkedMovies}
                onClick={showBookmarkedMoviesSeriesClick}
              />
            ) : (
              <img
                className="selectType"
                src={BookmarkedMoviesSeries}
                onClick={showBookmarkedMoviesSeriesClick}
              />
            )}
          </div>
          <div className="profilePhotoBox" onClick={LogoutClick}></div>
          {logout && (
            <div className="logoutBox" onClick={Loggedout}>
              Logout
            </div>
          )}
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
          style={{ transform: `translateX(${trendingLeft}px)` }}
          onClick={handleMoveTrendingLeft}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={trendingContainerRef}
        >
          {movies
            .filter((movie) => movie.isTrending)
            .map((movie) => {
              const id = `trending_${movie.id}`;
              return (
                <div className="trendingBox" key={movie.id}>
                  {/* <div className="trendingBookMarkBox">
                  {movie.isBookmarked ? (
                    <img
                      className="trendingBookMarkIcon"
                      src={bookMarkIconFull}
                      onClick={() => makeBookMarked(id)}
                    />
                  ) : (
                    <img
                      className="trendingBookMarkIcon"
                      src={bookMarkIcon}
                      onClick={() => makeBookMarked(id)}
                    />
                  )}
                </div> */}
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
                        <a className="trendingMovieTypeText">
                          {movie.category}
                        </a>
                      </div>
                    </div>
                    <a className="movieTvShowTitle">{movie.title}</a>
                    <div className="tredingMovieClass">
                      <a className="tredingMovieClassText">{movie.rating}</a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {showAllMovies && (
          <Recommended
            movies={movies}
            setMovies={setMovies}
            readInputValue={readInputValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            filteredMovies={filteredMovies}
            bookMarked={bookMarked}
            setBookMarked={setBookMarked}
            makeBookMarked={makeBookMarked}
          />
        )}
        {showOnlyMovies && (
          <Movies
            movies={movies}
            setMovies={setMovies}
            readInputValue={readInputValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            filteredMovies={filteredMovies}
            bookMarked={bookMarked}
            setBookMarked={setBookMarked}
            makeBookMarked={makeBookMarked}
          />
        )}

        {showOnlyTvSeries && (
          <TvSeries
            movies={movies}
            setMovies={setMovies}
            readInputValue={readInputValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            filteredMovies={filteredMovies}
            bookMarked={bookMarked}
            setBookMarked={setBookMarked}
            makeBookMarked={makeBookMarked}
          />
        )}
        {showBookmarkedMoviesSeries && (
          <Bookmarked
            movies={movies}
            setMovies={setMovies}
            readInputValue={readInputValue}
            inputValue={inputValue}
            setInputValue={setInputValue}
            filteredMovies={filteredMovies}
            bookMarked={bookMarked}
            setBookMarked={setBookMarked}
            makeBookMarked={makeBookMarked}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
