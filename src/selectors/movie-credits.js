import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const selectIsFetchingCredits = (state) => state.movies.isFetchingCredits;

const selectCredits = (state) => state.movies.movieCredits.credits;

const selectMovieCredits = createSelector(
  [selectIsFetchingCredits, selectCredits],
  (isFetching, movieCredits) => {
    if (!isFetching && isEmpty(movieCredits)) {
      return [];
    }
    if (isFetching && isEmpty(movieCredits)) {
      return Array(8).fill({});
    }
    return movieCredits;
  }
);

export default selectMovieCredits;
