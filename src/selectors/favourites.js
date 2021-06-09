import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const selectIsFetchingFavourites = (state) => state.movies.isFetchingFavourites;

const selectFavourites = (state) => state.movies.favouritesList;

const selectFavouriteMovies = createSelector(
  [selectIsFetchingFavourites, selectFavourites],
  (isFetching, favourites) => {
    if (!isFetching && isEmpty(favourites)) {
      return [];
    }
    return isEmpty(favourites) ? Array(6).fill({}) : favourites;
  }
);

export default selectFavouriteMovies;
