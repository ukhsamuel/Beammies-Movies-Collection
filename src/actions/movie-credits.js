import { toast } from 'react-toastify';
import {
  MOVIE_CREDITS_API_START,
  MOVIE_CREDITS_API_SUCCESS,
  MOVIE_CREDITS_API_FAILURE,
} from './types';

const movieCreditsAPIStart = (payload) => ({
  type: MOVIE_CREDITS_API_START,
  payload,
});

const movieCreditsAPISuccess = (payload) => ({
  type: MOVIE_CREDITS_API_SUCCESS,
  payload,
});

const movieCreditsAPIFailure = (payload) => ({
  type: MOVIE_CREDITS_API_FAILURE,
  payload,
});

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const doGetMovieCreditsAPI = (movieId) => (dispatch) => {
  dispatch(
    movieCreditsAPIStart({
      isFetchingCredits: true,
      movieCredits: {
        id: '',
        credits: [],
      },
    })
  );

  // eslint-disable-next-line no-undef
  return fetch(`${BASE_URL}/${movieId}/credits`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then(async (response) => {
      dispatch(
        movieCreditsAPISuccess({
          movieCredits: {
            id: movieId,
            credits: response.cast,
          },
          isFetchingCredits: false,
        })
      );
    })
    .catch((error) => {
      dispatch(
        movieCreditsAPIFailure({
          errorMessage: error.message,
          isFetchingCredits: false,
        })
      );
      toast.error(`Error: ${error.message}`);
    });
};

export default doGetMovieCreditsAPI;
