import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Logo from '../../assets/images/logo.svg';
import Home from '../../assets/images/home.svg';
import Favourite from '../../assets/images/favourite.svg';

const navItems = [
  {
    text: 'Home',
    link: '/',
    icon: Home,
  },
  {
    text: 'Favourites',
    link: '/favourites',
    icon: Favourite,
  },
];
const Nav = () => {
  const [isMobile, setIsMobile] = useState(document.body.clientWidth < 768);

  const setMobileState = () => document.body.clientWidth < 768;

  const resetPreview = debounce(() => {
    const mobile = setMobileState();
    setIsMobile(mobile);
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', resetPreview);
    setMobileState();

    return () => window.removeEventListener('resize', resetPreview);
  }, [resetPreview]);

  return (
    <header className="navbar">
      <nav>
        <article>
          <p>Powered by</p>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <img src={Logo} alt="Logo of themovied" />
          </a>
        </article>
        <ul>
          {navItems.map((navItem) => (
            <li key={navItem.text}>
              <Link to={navItem.link}>
                {!isMobile ? navItem.text : <img src={navItem.icon} alt={navItem.text} />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
