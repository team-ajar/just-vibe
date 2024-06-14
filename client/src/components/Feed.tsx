import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Feed = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // const searchUser = (q: any) => {
  //   axios.get(`/api/search/users/${q}`)
  //     .then((data: any) => setSearchResults(data))
  //     .catch((err: any) => console.error(err));
  // }
  const handleChange = (e: any) => {
    setQuery(e);
  };

  return (
    <div>
      <h1>Feed</h1>
      <div>
        <input
        type='text'
        placeholder='Search for a user by username'
        onChange={(e) => handleChange(e.target.value)}
        />
        {/* <button onClick={() => searchUser(query)}>Search User</button> */}
        <Link to={`/search/users/${query}`}>Search Users</Link>
      </div>
    </div>
  )
};

export default Feed;
