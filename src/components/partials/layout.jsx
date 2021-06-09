import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import Nav from './nav';

const Layout = ({ children, className }) => (
  <>
    <Nav />
    <main className={`layout ${className}`}>{children}</main>
    <Footer />
  </>
);

Layout.defaultProps = {
  className: '',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Layout;
