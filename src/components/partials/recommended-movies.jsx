import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';

import actions from '../../actions';
import selectors from '../../selectors';

import MovieCard from './movie-card';

const RecommendedMovies = ({ movieId }) => {
  const dispatch = useDispatch();

  const recommendedMovies = useSelector(selectors.selectRecommendedMovies, isEqual);

  useEffect(() => {
    dispatch(actions.doRecommendMovieAPI(movieId));
  }, [movieId, dispatch]);

  return (
    <article className="recommended-movies">
      <h3>Recommended Movies</h3>
      {isEmpty(recommendedMovies) ? (
        <p>There are no recommended movies</p>
      ) : (
        <div>
          {recommendedMovies.map((movie, index) => (
            <MovieCard key={movie.id ? `${movie.id}-${index}` : index} movie={movie} />
          ))}
        </div>
      )}
    </article>
  );
};

RecommendedMovies.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default RecommendedMovies;
