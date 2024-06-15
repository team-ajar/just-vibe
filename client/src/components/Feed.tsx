import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

const Feed = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState<User>({id: 0, googleId: '', location: '', name: '', username: '' });

  const loadUser = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch(err => console.error(err));
  };

  const loadReviews = (userId: number) => {
    axios.get(`/api/feed/reviews/${userId}`)
      .then((response: any) => {
        console.log('response data:', response.data);
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e: any) => {
    setQuery(e);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user.id !== 0) {
      console.log('User ID after load:', user.id);
      loadReviews(user.id);
    }
  }, [user]);

  return (
    <div>
      <h1>Feed</h1>
      <div>
        <input
        type='text'
        placeholder='Search for a user by username'
        onChange={(e) => handleChange(e.target.value)}
        />
        <Link to={`/search/users/${query}`}>Search Users</Link>
      </div>
    </div>
  )
};

export default Feed;
