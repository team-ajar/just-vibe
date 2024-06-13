import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

//define the structure of a Album Object 

interface Album {
  id: number;
  albumName: string;
  artistName: string;
  image: string;
}

const Profile = () => {

  // const [username, setUsername] = useState('username');
  // const [displayName, setDisplayName] = useState('name');
  const [user, setUser] = useState<User>({id: 0, googleId: '', location: '', name: '', username: '' });

  //create another useState hook that will manage all of our savedAlbums
  //also use the typescript <[]> annotation to inform it's an array
  /** savedAlbums is the initial value of the empty array,
   * and setSavedAlbums is a function that will be used to update the savedAlbums array
  */
  const [albums, setAlbums] = useState<Album[]>([]); //Album is the interface defined above
  


  const loadPage = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        console.log(data);
        setUser(data);
        // setUsername(data.username);
        // setDisplayName(data.name);
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
        // setDisplayName(data.name);
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
      <div>
        <h2>Top 3 Albums</h2>
      </div>
    </div>
  )
}

export default Profile;
