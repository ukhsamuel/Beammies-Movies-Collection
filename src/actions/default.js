/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import { FETCH_API_START, FETCH_API_SUCCESS, FETCH_API_FAILURE } from './types';

const fetchAPIStart = (payload) => ({
  type: FETCH_API_START,
  payload,
});

const fetchAPISuccess = (payload) => ({
  type: FETCH_API_SUCCESS,
  payload,
});

const fetchAPIFailure = (payload) => ({
  type: FETCH_API_FAILURE,
  payload,
});

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const doFetchAPI = () => async (dispatch) => {
  dispatch(fetchAPIStart());

  return fetch(`${BASE_URL}/now_playing?page=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const defaultMovies = response.results.sort((a, b) => a.title.localeCompare(b.title));
      dispatch(
        fetchAPISuccess({
          defaultMovies,
          isFetching: false,
        })
      );
    })
    .catch((error) => {
      dispatch(
        fetchAPIFailure({
          errorMessage: error.message,
          isFetching: false,
        })
      );
      toast.error(`Error: ${error.message}`);
    });
};

export default doFetchAPI;
