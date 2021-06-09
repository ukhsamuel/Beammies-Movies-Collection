/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';
import RateMovie from '../components/partials/rate-movie';
import movie from '../__mocks__/movie';

// Create Mock Redux store
const mockStore = configureStore();

describe('Rate Movie', () => {
  let rateMovieComponent;
  let store;

  beforeEach(() => {
    store = mockStore({});
    rateMovieComponent = shallow(
      <Provider store={store}>
        <RateMovie movieId={movie.id} />
      </Provider>
    );
  });

  it('Renders the appropriate rating buttons', () => {
    expect(rateMovieComponent.find('div Button')).toHaveLength(10);
  });

  afterEach(() => {
    rateMovieComponent.unmount();
  });
});
