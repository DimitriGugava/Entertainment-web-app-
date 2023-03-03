import bookMarkIcon from "../assets/icon-bookmark-empty.svg";
import bookMarkIconFull from "../assets/icon-bookmark-full.svg";
import movieType from "../assets/movieType.svg";
import data from "../data.json";

const BookMarked = (props: any) => {
  return (
    <div className="recommendedContainer">
      <h1 className="recommendedText">Bookmarked</h1>
      <div className="recommendedMovieListContainer">
        {props.filteredMovies
          .filter((movie: any) => movie.isBookmarked === true)
          .map((movie: any) => {
            const id = `recommended_${movie.id}`;
            return (
              <div className="recommendedMobieBox" key={movie.id}>
                <img
                  className="recommendedMovieImage"
                  src={movie.thumbnail.regular?.small}
                />
                <div className="recommendedMovieInfoBox">
                  <div className="recommendedMovieFirstInfoPartBox">
                    <a className="recommendedMovieYear">{movie.year}</a>
                    <div className="recommendedMovieDot"></div>
                    <div className="recommendedMovieTypeBox">
                      <img
                        className="recommendedMovieTypeIcon"
                        src={movieType}
                      />
                      <a className="recommendedMovieTypeText">
                        {movie.category}
                      </a>
                    </div>
                    <div className="recommendedMovieDot"></div>
                    <a className="recommendedMovieRating">{movie.rating}</a>
                  </div>
                  <a className="recommendedMovieTitle">{movie.title}</a>
                </div>
                <div className="recommendedBookMarkBox">
                  {movie.isBookmarked ? (
                    <img
                      className="recommendeBookmarkIcon"
                      src={bookMarkIconFull}
                      onClick={() => props.makeBookMarked(id)}
                    />
                  ) : (
                    <img
                      className="recommendeBookmarkIcon"
                      src={bookMarkIcon}
                      onClick={() => props.makeBookMarked(id)}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BookMarked;
