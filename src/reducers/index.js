import {
  FETCH_API_START,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
  RECOMMEND_MOVIE_API_START,
  RECOMMEND_MOVIE_API_SUCCESS,
  RECOMMEND_MOVIE_API_FAILURE,
  FETCH_FAVOURITES_START,
  FETCH_FAVOURITES_SUCCESS,
  FETCH_FAVOURITES_FAILURE,
  RATING_MOVIE_API_START,
  RATING_MOVIE_API_SUCCESS,
  RATING_MOVIE_API_FAILURE,
  MOVIE_CREDITS_API_START,
  MOVIE_CREDITS_API_SUCCESS,
  MOVIE_CREDITS_API_FAILURE,
  GUEST_AUTH_API_START,
  GUEST_AUTH_API_SUCCESS,
  GUEST_AUTH_API_FAILURE,
  GENRE_API_START,
  GENRE_API_SUCCESS,
  GENRE_API_FAILURE,
} from '../actions/types';

export const defaultState = {
  isFetching: true,
  isRecommending: false,
  isFetchingFavourites: false,
  isFetchingCredits: false,
  isFetchingGuestId: false,
  isFetchingGenres: false,
  defaultMovies: [],
  recommendedMovies: {
    id: '',
    movies: [],
  },
  favouritesList: [],
  movieCredits: {
    id: '',
    credits: [],
  },
  guestId: '',
  genres: [],
};

export default function moviesReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_API_START:
    case FETCH_API_SUCCESS:
    case FETCH_API_FAILURE:
    case RECOMMEND_MOVIE_API_START:
    case RECOMMEND_MOVIE_API_SUCCESS:
    case RECOMMEND_MOVIE_API_FAILURE:
    case FETCH_FAVOURITES_START:
    case FETCH_FAVOURITES_FAILURE:
    case RATING_MOVIE_API_START:
    case RATING_MOVIE_API_SUCCESS:
    case RATING_MOVIE_API_FAILURE:
    case MOVIE_CREDITS_API_START:
    case MOVIE_CREDITS_API_SUCCESS:
    case MOVIE_CREDITS_API_FAILURE:
    case GUEST_AUTH_API_START:
    case GUEST_AUTH_API_SUCCESS:
    case GUEST_AUTH_API_FAILURE:
    case GENRE_API_START:
    case GENRE_API_SUCCESS:
    case GENRE_API_FAILURE: {
      return {
        ...state,
        ...payload,
      };
    }

    case FETCH_FAVOURITES_SUCCESS: {
      const { favourites, isFetchingFavourites } = payload;
      const { defaultMovies } = state;

      const favouritesList = defaultMovies.filter((movie) => {
        return favourites.includes(movie.id);
      });

      return {
        ...state,
        favouritesList,
        isFetchingFavourites,
      };
    }

    default: {
      return state;
    }
  }
}
