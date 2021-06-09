import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { localStorageAvailable } from '../../utils';
import Favourite from '../../assets/images/favourite.svg';
import Favourited from '../../assets/images/favourited.svg';

import Button from './button';

const FavouritesButton = ({ movieId }) => {
  const [localFavourites, setLocalFavourites] = useState(
    JSON.parse(localStorage.getItem('favouriteMovies')) || []
  );

  const doFavouriteMovie = (id) => {
    const favourites = JSON.parse(localStorage.getItem('favouriteMovies'));

    if (!favourites) {
      const favouriteMovies = [];
      favouriteMovies.push(id);
      localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));

      setLocalFavourites(favouriteMovies);
      return;
    }

    favourites.push(id);
    localStorage.setItem('favouriteMovies', JSON.stringify(favourites));
    setLocalFavourites(favourites);
  };

  const doRemoveFavouriteMovie = (id) => {
    let favourites = JSON.parse(localStorage.getItem('favouriteMovies'));
    favourites = favourites.filter((favouriteId) => favouriteId !== id);
    localStorage.setItem('favouriteMovies', JSON.stringify(favourites));

    setLocalFavourites(favourites);
  };

  const isStorageAvailable = localStorageAvailable();

  if (!isStorageAvailable) {
    return null;
  }

  return (
    <article className="favourites-button">
      {localFavourites && localFavourites.includes(movieId) ? (
        <Button
          type="icon"
          iconLink={Favourited}
          text="Remove from favourites"
          title="Remove from favourites"
          onClick={() => doRemoveFavouriteMovie(movieId)}
        />
      ) : (
        <Button
          text="Add to favourites"
          title="Add to favourites"
          type="icon"
          iconLink={Favourite}
          onClick={() => doFavouriteMovie(movieId)}
        />
      )}
    </article>
  );
};

FavouritesButton.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default FavouritesButton;
