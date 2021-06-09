import { toast } from 'react-toastify';
import {
  FETCH_FAVOURITES_START,
  FETCH_FAVOURITES_SUCCESS,
  FETCH_FAVOURITES_FAILURE,
} from './types';

const fetchFavouritesStart = (payload) => ({
  type: FETCH_FAVOURITES_START,
  payload,
});

const fetchFavouritesSuccess = (payload) => ({
  type: FETCH_FAVOURITES_SUCCESS,
  payload,
});

const fetchFavouritesFailure = (payload) => ({
  type: FETCH_FAVOURITES_FAILURE,
  payload,
});

const doFetchFavourites = () => async (dispatch) => {
  dispatch(
    fetchFavouritesStart({
      isFetchingFavourites: true,
    })
  );
  try {
    const favourites = JSON.parse(localStorage.getItem('favouriteMovies'));
    dispatch(
      fetchFavouritesSuccess({
        favourites,
        isFetchingFavourites: false,
      })
    );
  } catch (e) {
    dispatch(
      fetchFavouritesFailure({
        isFetchingFavourites: false,
      })
    );
    toast.error(`Error: Could not load Favourite movies`);
  }
};

export default doFetchFavourites;
