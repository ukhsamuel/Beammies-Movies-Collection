import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';

import selectors from '../../selectors';
import actions from '../../actions';
import CharacterCard from './character-card';

const MovieCredits = ({ movieId }) => {
  const dispatch = useDispatch();
  const movieCredits = useSelector(selectors.selectMovieCredits, isEqual);

  useEffect(() => {
    dispatch(actions.doGetMovieCreditsAPI(movieId));
  }, [dispatch, movieId]);

  if (isEmpty(movieCredits)) {
    return null;
  }

  return (
    <article className="movie-credits">
      <h3>Characters</h3>
      <div>
        {movieCredits.map((character, index) => (
          <CharacterCard
            key={character.id ? `${character.id}-${index}` : index}
            character={character}
          />
        ))}
      </div>
    </article>
  );
};

MovieCredits.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieCredits;
