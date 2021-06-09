import React, { useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../partials/layout';
import MovieGrid from '../partials/movie-grid';

import actions from '../../actions';
import selectors from '../../selectors';

const Favourites = () => {
  const dispatch = useDispatch();

  const favouriteMovies = useSelector(selectors.selectFavourites, isEqual);
  const defaultMovies = useSelector(selectors.selectDefaultMovies, isEqual);

  useEffect(() => {
    if (!isEmpty(defaultMovies) && defaultMovies[0].id) {
      dispatch(actions.doFetchFavourites());
    }
  }, [dispatch, defaultMovies]);

  return (
    <Layout>
      <section className="favourites">
        <h1>Favourite Movies</h1>
        {isEmpty(favouriteMovies) ? (
          <p>You have no favourites movies.</p>
        ) : (
          <MovieGrid movies={favouriteMovies} />
        )}
      </section>
    </Layout>
  );
};

export default Favourites;
