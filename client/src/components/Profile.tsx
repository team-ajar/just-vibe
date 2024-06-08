import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

const Profile = () => {

  const [username, setUsername] = useState('username');
  const [displayName, setDisplayName] = useState('name');
  const [user, setUser] = useState<User>({id: 0, googleId: '', location: '', name: '', username: '' });

  const loadPage = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        console.log(data);
        setUser(data);
        setUsername(data.username);
        setDisplayName(data.name);
      })
      .catch(err => console.error(err));
  };

  const editProfile = () => {
    console.log(user);
    let updateName = prompt('enter new name');
    axios.put(`/api/user/${user.id}`, {
      updateType: "name",
      updateVal: updateName
    })
      .then(({ data }: any) =>{
        console.log('update', data)
        setDisplayName(data.name);
        })
      .catch(err => console.error(err));
      
  };

  useEffect(() => {
    loadPage()
  }, [username])

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => editProfile()}>Edit profile</button>
      <h3>Username: {username}</h3>
      <h4>Name: {displayName}</h4>
    </div>
  )
}

export default Profile;
