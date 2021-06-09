import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';

import selectors from '../../selectors';
import actions from '../../actions';

const MovieGenre = ({ genreIds }) => {
  const dispatch = useDispatch();
  const movieGenres = useSelector(selectors.selectMovieGenres, isEqual);

  useEffect(() => {
    if (isEmpty(movieGenres)) {
      dispatch(actions.doFetchGenresAPI());
    }
  }, [dispatch, movieGenres]);

  const getMovieGenre = useCallback(() => {
    const movieGenre = [];

    for (let i = 0; i < movieGenres.length; i += 1) {
      if (genreIds.includes(movieGenres[i].id)) {
        movieGenre.push(movieGenres[i].name);
      }
    }

    return movieGenre;
  }, [genreIds, movieGenres]);

  if (isEmpty(movieGenres)) {
    return null;
  }

  return <p className="movie-genre">{getMovieGenre().join(' - ')}</p>;
};

MovieGenre.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MovieGenre;
