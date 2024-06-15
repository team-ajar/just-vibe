import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbums } from "@prisma/client";
import { TopAlbumsComponent } from "./TopAlbums";
import { TopArtistsComponent } from "./TopArtists";

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
  const [user, setUser] = useState<User>({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
  });

  const loadPage = () => {
    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const editName = () => {
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

  const editUsername = () => {
    let updateName = prompt('enter new username');
    axios.put(`/api/user/${user.id}`, {
      updateType: "username",
      updateVal: updateName
    })
      .then(({ data }: any) =>{
        setUser(data)
        })
      .catch(err => console.error(err));
  };

  const deleteProfile = () => {
    let answer = prompt("enter your username to delete:");
    const delUser = {
      id: 0,
      googleId: "",
      location: "",
      name: "",
      username: "",
    };
    if (answer === user.username) {
      axios.delete(`/api/user/${user.id}`).then(() => setUser(delUser));
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={() => editName()}>Edit Name</button>
      <button onClick={() => editUsername()}>Edit Username</button>
      <button onClick={() => deleteProfile()}>Delete profile</button>
      <h3>Username: {user.username}</h3>
      <h4>Name: {user.name}</h4>
      {user.id > 0 && <TopAlbumsComponent userId={user.id} />}
      {user.id > 0 && <TopArtistsComponent userId={user.id} />}
    </div>
  );
};

export default Profile;
