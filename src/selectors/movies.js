import isEmpty from 'lodash/isEmpty';

const selectDefaultMovies = (state) =>
  isEmpty(state.movies.defaultMovies) ? Array(6).fill({}) : state.movies.defaultMovies;

export default selectDefaultMovies;
