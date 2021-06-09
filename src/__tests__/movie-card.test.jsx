/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';
import MovieCard from '../components/partials/movie-card';
import movieMock from '../__mocks__/movie';

// Create Mock Redux store
const mockStore = configureStore();

const getDummyProps = () => {
  const movie = movieMock;

  return {
    movie,
  };
};

describe('Movie Card', () => {
  let movieCardComponent;
  let store;

  beforeEach(() => {
    const { movie } = getDummyProps();

    store = mockStore({});
    movieCardComponent = shallow(
      <Provider store={store}>
        <MovieCard movie={movie} />
      </Provider>
    );
  });

  it('Renders the appropriate movie placeholder poster', () => {
    expect(movieCardComponent.find('.movie-card__placeholder')).toHaveLength(1);
  });

  it('Renders the appropriate movie placeholder content', () => {
    expect(movieCardComponent.find('.movie-card__placeholder-content')).toHaveLength(1);
  });

  it('Renders the LazyLoad component', () => {
    const lazyloadComponent = movieCardComponent.findWhere((n) => n.name() === 'LazyLoad');
    expect(lazyloadComponent).toHaveLength(1);
  });

  it('Renders the Movie poster', () => {
    expect(movieCardComponent.find('img')).toHaveLength(0);
  });

  it('Renders no LazyLoad image child', () => {
    expect(movieCardComponent.find('img').exists()).not.toBeTruthy();
  });

  it('Renders the corrent image src', () => {
    const { movie } = getDummyProps();
    const lazyloadComponent = movieCardComponent.findWhere((n) => n.name() === 'LazyLoad');
    expect(lazyloadComponent.props().children.props.src).toEqual(
      `https://themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`
    );
  });

  afterEach(() => {
    movieCardComponent.unmount();
  });
});
