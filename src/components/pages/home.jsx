import React from 'react';
import isEqual from 'lodash/isEqual';
import { useSelector } from 'react-redux';

import Layout from '../partials/layout';
import MovieGrid from '../partials/movie-grid';

import selectors from '../../selectors';

const Home = () => {
  const defaultMovies = useSelector(selectors.selectDefaultMovies, isEqual);

  return (
    <Layout>
      <section className="home">
        <h1>Now Playing</h1>
        <MovieGrid movies={defaultMovies} type="default" />
      </section>
    </Layout>
  );
};

export default Home;
