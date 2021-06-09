import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../assets/images/close.svg';
import Rate from '../../assets/images/rate.svg';
import Rated from '../../assets/images/rated.svg';

import actions from '../../actions';
import selectors from '../../selectors';

import Button from './button';

const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const RateMovie = ({ movieId }) => {
  const dispatch = useDispatch();
  const [isRating, setIsRating] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const guestId = useSelector(selectors.selectGuestId);

  const displayRating = (temp) => {
    setTempRating(temp);
  };

  const removeRating = () => {
    setTempRating(0);
  };

  const getRatingIcon = () => {
    if (isRating) {
      return Close;
    }
    if (ratingValue === 0) {
      return Rate;
    }
    return Rated;
  };

  useEffect(() => {
    if (!guestId && isRating) {
      dispatch(actions.doGuestAuthAPI());
    }
  }, [isRating, guestId, dispatch]);

  return (
    <section className="rate-movies">
      <article className="rate-movies__scale">
        <Button
          type="icon"
          title="Rate this movie once"
          iconLink={getRatingIcon()}
          className="rate-button"
          text="Rate this movie"
          onClick={() => setIsRating(!isRating)}
        />
        {tempRating > 0 && ratingValue === 0 && (
          <p className="rate-movies__temp">
            {tempRating}
            {` star${tempRating > 1 ? 's' : ''}`}
          </p>
        )}
        {ratingValue > 0 && (
          <p className="rate-movies__temp">
            {ratingValue}
            {` star${ratingValue > 1 ? 's' : ''}`}
          </p>
        )}
        {isRating && (
          <div>
            {ratings.map((rating) => (
              <Button
                type="icon"
                iconLink={rating > ratingValue ? Rate : Rated}
                key={rating}
                onMouseEnter={() => displayRating(rating)}
                onMouseLeave={() => removeRating(rating)}
                disabled={!guestId || Boolean(ratingValue)}
                onClick={() => {
                  setRatingValue(rating);
                  dispatch(actions.doRatingMovieAPI(movieId, rating, guestId));
                }}
              />
            ))}
          </div>
        )}
      </article>
    </section>
  );
};

RateMovie.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default RateMovie;
