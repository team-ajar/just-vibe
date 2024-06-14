import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const SearchUsers = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState({id: 0, googleId: '', location: '', name: '', username: '' });

  const loadUser = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    loadUser();

    fetch(`/api/search/users/${query}`)
      .then((data: any) => data.json())
      .then((response: any) => {
        setSearchResults(response);
      })
      .catch((err: any) => console.error(err));
  }, [query]);

  const followUser = (following: any) => {
    axios.post(`/api/follow/${user.id}/${following}`);
  };

  const unfollowUser = (unfollowing: any) => {
    axios.delete(`/api/follow/${user.id}/${unfollowing}`);
  }

return (
  <div>
    <h1>People:</h1>
    <ul>
      {searchResults.map((user: any, index: number) => (
        <li key={index}>{`@${user.username} - ${user.name}`}
          <button onClick={() => followUser(user.id)}>Follow</button>
          <button onClick={() => unfollowUser(user.id)}>Unfollow</button>
        </li>
      ))}
    </ul>
  </div>
)
};

export default SearchUsers;
