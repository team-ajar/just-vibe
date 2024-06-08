import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const Profile = () => {

  const [username, setUsername] = useState('username');
  const [displayName, setDisplayName] = useState('name');

  const loadPage = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        setUsername(data.username);
        setDisplayName(data.name);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadPage()
  })

  return (
    <div>
      <h1>Profile</h1>
      <h3>Username: {username}</h3>
      <h4>Name: {displayName}</h4>
    </div>
  )
}

export default Profile;
