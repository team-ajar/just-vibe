import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LightDarkMode from './LightDarkMode';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="nav-bar">
      <div className="logo">
        <Link to="/">Just Vibe</Link>
        <Link to="/user">Profile</Link>
        <Link to="/feed">Feed</Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an artist or album"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to={`/search-results/${searchQuery}`}>Search</Link>
      </div>
      <LightDarkMode/>
    </nav>
  );
};

export default NavBar;
