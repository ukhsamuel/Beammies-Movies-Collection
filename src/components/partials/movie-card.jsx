import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import FavouritesButton from './favourites-button';

const MovieCard = ({ movie }) => {
  const history = useHistory();

  const refPlaceholder = useRef();
  const refContentPlaceholder = useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
    refContentPlaceholder.current.remove();
  };

  const viewMovieDetails = (movieId) => {
    history.push(`/movie/${movieId}`);
  };

  const movieImage = () => {
    if (movie.poster_path) {
      return `https://themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`;
    }
    return '';
  };

  return (
    <div className="movie-card">
      <div className="movie-card__placeholder" ref={refPlaceholder} />

      <div className="movie-card__placeholder-content" ref={refContentPlaceholder}>
        <div />
        <div />
        <div />
      </div>

      {movie.id && (
        <>
          <LazyLoad once offset={300}>
            <img
              className="movie-card__loaded-image"
              onLoad={removePlaceholder}
              onError={removePlaceholder}
              src={movieImage()}
              alt={movie.title}
            />
          </LazyLoad>

          <div className="movie-card__overlay" aria-label="movie-overlay" />
          <div className="movie-card__content">
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
            <p className="vote-average">{movie.vote_average}</p>
          </div>

          <button
            type="button"
            className="movie-card__button"
            aria-label="View movie details"
            onClick={() => viewMovieDetails(movie.id)}
          />
          <FavouritesButton movieId={movie.id} />
        </>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MovieCard;
