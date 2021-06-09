/* eslint-disable no-undef */
import { toast } from 'react-toastify';
import { GUEST_AUTH_API_START, GUEST_AUTH_API_SUCCESS, GUEST_AUTH_API_FAILURE } from './types';

const guestAuthAPIStart = (payload) => ({
  type: GUEST_AUTH_API_START,
  payload,
});

const guestAuthAPISuccess = (payload) => ({
  type: GUEST_AUTH_API_SUCCESS,
  payload,
});

const guestAuthAPIFailure = (payload) => ({
  type: GUEST_AUTH_API_FAILURE,
  payload,
});

const BASE_URL = process.env.REACT_APP_BASE;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const doGuestAuthAPI = () => async (dispatch) => {
  dispatch(
    guestAuthAPIStart({
      isFetchingGuestId: true,
    })
  );

  return fetch(`${BASE_URL}/authentication/guest_session/new`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch(
        guestAuthAPISuccess({
          guestId: response.guest_session_id,
          isFetchingGuestId: false,
        })
      );
    })
    .catch((error) => {
      dispatch(
        guestAuthAPIFailure({
          errorMessage: error.message,
          isFetchingGuestId: false,
        })
      );
      toast.error(`Error: ${error.message}`);
    });
};

export default doGuestAuthAPI;
