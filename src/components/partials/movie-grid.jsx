import React from 'react';
import PropTypes from 'prop-types';

import MovieCard from './movie-card';

const MovieGrid = ({ movies }) => (
  <article className="movie-grid">
    {movies.map((movie, index) => (
      <React.Fragment key={movie.id ? `${movie.id}-${index}` : index}>
        <MovieCard movie={movie} />
      </React.Fragment>
    ))}
  </article>
);

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieGrid;
