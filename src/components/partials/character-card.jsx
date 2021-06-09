import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

const CharacterCard = ({ character }) => {
  const characterCardRef = useRef();
  const refPlaceholder = useRef();
  const refContentPlaceholder = useRef();

  const removePlaceholder = () => {
    refContentPlaceholder.current.remove();
    if (character.profile_path) {
      refPlaceholder.current.remove();
    } else {
      characterCardRef.current.querySelector('.lazyload-wrapper').style.display = 'none';
    }
  };

  const characterImage = () => {
    if (character.profile_path) {
      return `https://themoviedb.org/t/p/w276_and_h350_face${character.profile_path}`;
    }
    return '';
  };

  return (
    <div className="character-card" ref={characterCardRef}>
      <div className="character-card__body">
        <div className="character-card__placeholder" ref={refPlaceholder} />

        {character.name && (
          <LazyLoad once offset={300}>
            <img
              className="character-card__loaded-image"
              onLoad={removePlaceholder}
              onError={removePlaceholder}
              src={characterImage()}
              alt={character.name}
            />
          </LazyLoad>
        )}
      </div>

      <div className="character-card__placeholder-content" ref={refContentPlaceholder}>
        <div />
        <div />
      </div>

      {character.name && (
        <div className="character-card__content">
          <h4>{character.name}</h4>
          <p>{character.character.replace(' (voice)', '')}</p>
        </div>
      )}
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CharacterCard;
