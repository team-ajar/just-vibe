import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>({id: 0, googleId: '', location: '', name: '', username: '' });

  const loadPage = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch(err => console.error(err));
  };

  const editProfile = () => {
    let updateName = prompt('enter new name');
    axios.put(`/api/user/${user.id}`, {
      updateType: "name",
      updateVal: updateName
    })
      .then(({ data }: any) =>{
        setUser(data)
        })
      .catch(err => console.error(err));
  };

  const deleteProfile = () => {
    let answer = prompt('enter your username to delete:');
    const delUser = {
      id: 0,
      googleId: '',
      location: '',
      name: '',
      username: '',
    }
    if (answer === user.username) {
      axios.delete(`/api/user/${user.id}`)
        .then(() => setUser(delUser));
    }
  };

  useEffect(() => {
    loadPage()
  }, [])

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => editProfile()}>Edit profile</button>
      <button onClick={() => deleteProfile()}>Delete profile</button>
      <h3>Username: {user.username}</h3>
      <h4>Name: {user.name}</h4>
    </div>
  )
}

export default Profile;
