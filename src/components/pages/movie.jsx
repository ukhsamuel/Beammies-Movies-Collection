import React, { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from '../partials/layout';
import RecommendedMovies from '../partials/recommended-movies';
import RateMovie from '../partials/rate-movie';
import FavouritesButton from '../partials/favourites-button';

import selectors from '../../selectors';
import MovieCredits from '../partials/movie-credits';
import MovieGenre from '../partials/movie-genre';

const Movie = () => {
  let { movieId } = useParams();
  movieId = parseInt(movieId, 10);

  const [movieDetails, setMovieDetails] = useState({});
  const defaultMovies = useSelector(selectors.selectDefaultMovies, isEqual);

  useEffect(() => {
    if (!isEmpty(defaultMovies)) {
      const getMovieDetails = () => {
        const movieDetail = defaultMovies.find((movie) => movie.id === movieId);
        setMovieDetails(movieDetail);
      };

      getMovieDetails();
    }
  }, [movieId, defaultMovies]);

  return (
    <Layout className="movie-details">
      {!isEmpty(movieDetails) ? (
        <article
          className="movie-details__header"
          style={{
            backgroundImage: `url(https://themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path})`,
          }}
          // eslint-disable-next-line prettier/prettier
        >
          <div className="movie-details__poster">
            <img
              src={`https://themoviedb.org/t/p/w600_and_h900_bestv2/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <div className="movie-details__info">
            <h1>{movieDetails.title}</h1>

            <p>
              {'Released: '}
              {movieDetails.release_date}
            </p>

            <MovieGenre genreIds={movieDetails.genre_ids} />

            <article className="movie-details__actions">
              <FavouritesButton movieId={movieId} />
              <RateMovie movieId={movieId} />
            </article>

            <article className="movie-details__overview">
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
            </article>
          </div>
        </article>
      ) : (
        <div className="movie-details__header-placeholder" />
      )}
      <section className="movie-details__body">
        <MovieCredits movieId={movieId} />
        <RecommendedMovies movieId={movieId} />
      </section>
    </Layout>
  );
};

export default Movie;
