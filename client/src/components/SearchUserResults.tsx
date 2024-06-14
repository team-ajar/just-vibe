import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchUsers = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(`/api/search/users/${query}`)
      .then((data: any) => data.json())
      .then((response: any) => {
        setSearchResults(response);
      })
      .catch((err: any) => console.error(err));
  }, [query]);

return (
  <div>
    <h1>People:</h1>
    <ul>
      {searchResults.map((user: any, index: number) => (
        <li key={index}>{`@${user.username} - ${user.name}`}</li>
      ))}
    </ul>
  </div>
)
};

export default SearchUsers;
