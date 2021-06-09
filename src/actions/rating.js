import { toast } from 'react-toastify';
import {
  RATING_MOVIE_API_START,
  RATING_MOVIE_API_SUCCESS,
  RATING_MOVIE_API_FAILURE,
} from './types';

const ratingAPIStart = (payload) => ({
  type: RATING_MOVIE_API_START,
  payload,
});

const ratingAPISuccess = (payload) => ({
  type: RATING_MOVIE_API_SUCCESS,
  payload,
});

const ratingAPIFailure = (payload) => ({
  type: RATING_MOVIE_API_FAILURE,
  payload,
});

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const doRatingMovieAPI = (movieId, value, guestId) => (dispatch) => {
  dispatch(
    ratingAPIStart({
      isRating: true,
    })
  );

  // eslint-disable-next-line no-undef
  return fetch(`${BASE_URL}/${movieId}/rating?guest_session_id=${guestId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      value,
    }),
  })
    .then((response) => response.json())
    .then(async () => {
      dispatch(
        ratingAPISuccess({
          isRating: false,
        })
      );
    })
    .catch((error) => {
      dispatch(
        ratingAPIFailure({
          errorMessage: error.message,
          isRating: false,
        })
      );
      toast.error(`Error: ${error.message}`);
    });
};

export default doRatingMovieAPI;
