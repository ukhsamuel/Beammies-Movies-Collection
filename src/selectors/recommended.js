import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const selectIsRecommending = (state) => state.movies.isRecommending;

const selectRecommended = (state) => state.movies.recommendedMovies.movies;

const selectRecommendedMovies = createSelector(
  [selectIsRecommending, selectRecommended],
  (isRecommending, recommendedMovies) => {
    if (!isRecommending && isEmpty(recommendedMovies)) {
      return [];
    }
    if (isRecommending && isEmpty(recommendedMovies)) {
      return Array(6).fill({});
    }
    return recommendedMovies;
  }
);

export default selectRecommendedMovies;
