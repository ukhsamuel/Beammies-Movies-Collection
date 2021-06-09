/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import { GENRE_API_START, GENRE_API_SUCCESS, GENRE_API_FAILURE } from './types';

const genreAPIStart = (payload) => ({
  type: GENRE_API_START,
  payload,
});

const genreAPISuccess = (payload) => ({
  type: GENRE_API_SUCCESS,
  payload,
});

const genreAPIFailure = (payload) => ({
  type: GENRE_API_FAILURE,
  payload,
});

const BASE_URL = process.env.REACT_APP_BASE;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const doFetchGenresAPI = () => async (dispatch) => {
  dispatch(
    genreAPIStart({
      isFetchingGenres: true,
    })
  );

  return fetch(`${BASE_URL}/genre/movie/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch(
        genreAPISuccess({
          genres: response.genres,
          isFetchingGenres: false,
        })
      );
    })
    .catch((error) => {
      dispatch(
        genreAPIFailure({
          errorMessage: error.message,
          isFetchingGenres: false,
        })
      );
      toast.error(`Error: ${error.message}`);
    });
};

export default doFetchGenresAPI;
