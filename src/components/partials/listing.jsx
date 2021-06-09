import React from 'react';
import PropTypes from 'prop-types';

const Listing = ({ title, list }) => (
  <section className="listing">
    <h4>{title}</h4>
    <ul className="listing__list">
      {list.map((listItem) => (
        <li key={listItem.id}>{JSON.stringify(listItem)}</li>
      ))}
    </ul>
  </section>
);

Listing.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Listing;
