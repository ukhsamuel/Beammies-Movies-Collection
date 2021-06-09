import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import actions from './actions';
import { localStorageAvailable } from './utils';

import Home from './components/pages/home';
import Favourites from './components/pages/favourites';
import Movie from './components/pages/movie';
import Notifications from './components/partials/notifications';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doFetchAPI());
    dispatch(actions.doFetchGenresAPI());
  }, [dispatch]);

  return (
    <>
      <Notifications />
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Home} />

          {/* Show Favourites only if LocalStorage is supported */}
          {localStorageAvailable() && <Route path="/favourites" component={Favourites} />}

          <Route path="/movie/:movieId" component={Movie} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
