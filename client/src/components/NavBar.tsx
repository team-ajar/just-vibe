import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <Link to="/">Just Vibe</Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for an artist or album" />
        <button>Search</button>
      </div>
    </nav>
  );
};

export default NavBar;