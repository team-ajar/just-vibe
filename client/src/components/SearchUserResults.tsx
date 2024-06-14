import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchUsers = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    fetch(`/api/search/${query}`)
  })
return (
  <div>
    <h1>People:</h1>
    <ul>
      <li>Hello</li>
    </ul>
  </div>
)
};

export default SearchUsers;
