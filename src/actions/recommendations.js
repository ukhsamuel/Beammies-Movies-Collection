import { toast } from 'react-toastify';
import {
  RECOMMEND_MOVIE_API_START,
  RECOMMEND_MOVIE_API_SUCCESS,
  RECOMMEND_MOVIE_API_FAILURE,
} from './types';

const recommendAPIStart = (payload) => ({
  type: RECOMMEND_MOVIE_API_START,
  payload,
});

const recommendAPISuccess = (payload) => ({
  type: RECOMMEND_MOVIE_API_SUCCESS,
  payload,
});

const recommendAPIFailure = (payload) => ({
  type: RECOMMEND_MOVIE_API_FAILURE,
  payload,
});

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const doRecommendMovieAPI = (movieId) => (dispatch) => {
  dispatch(
    recommendAPIStart({
      isRecommending: true,
      recommendedMovies: {
        id: '',
        movies: [],
      },
    })
  );

  // eslint-disable-next-line no-undef
  return fetch(`${BASE_URL}/${movieId}/recommendations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then(async (response) => {
      dispatch(
        recommendAPISuccess({
          recommendedMovies: {
            id: movieId,
            movies: response.results.slice(0, 6),
          },
          isRecommending: false,
        })
      );
    })
    .catch((error) => {
      dispatch(
        recommendAPIFailure({
          errorMessage: error.message,
          isRecommending: false,
        })
      );
      toast.error(`Error: ${error.message}`);
    });
};

export default doRecommendMovieAPI;
