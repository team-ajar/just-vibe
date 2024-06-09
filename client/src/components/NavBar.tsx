import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  // searchQuery = state variable that holds the search queries
  // setSearchQuery = function that allows updating state
  // searchQuery is set to an empty string until setSearchQuery is called with a new value
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="nav-bar">
      <div className="logo">
        <Link to="/">Just Vibe</Link>
        <Link to="/user">Profile</Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an artist or album"
          // set value of input to searchQuery to reflect the current state
          value={searchQuery}
          // onChange event handler that updates searchQuery using setSearchQuery
          // when the input value changes, setSearchQuery updates searchQuery with the new value
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* when search is clicked,it will take you to a new view of the query */}
        <Link to={`/search-results/${searchQuery}`}>Search</Link>
      </div>
    </nav>
  );
};

export default NavBar;
