import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const EditProfile = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [user, setUser] = useState<User>({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
    bio: "",
    image: "",
  });

  const loadPage = () => {
    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err: any) => console.error(err));
  };

  const handleChange = (change: any, type: any) => {
    if (type === "username") {
      setUsername(change);
    } else if (type === "name") {
      setName(change);
    } else if (type === "bio") {
      setBio(change);
    }
  };

  const handleSubmit = () => {
    axios.patch(`/api/user/${user.id}`, {
      username: username.length ? username : user.username,
      name: name.length ? name : user.name,
      bio: bio.length ? bio : user.bio
    })
  }

  useEffect(() => {
    loadPage();
  }, [])

  return (
    <div>
      <h1>Edit Profile</h1>
      <form>
        <label>Username</label>
        <input
          type="text"
          placeholder="New username..."
          onChange={(e) => handleChange(e.target.value, "username")}
        ></input>
        <label>Name</label>
        <input
          type="text"
          placeholder="New name..."
          onChange={(e) => handleChange(e.target.value, "name")}
        ></input>
        <label>Bio</label>
        <textarea
          placeholder="New bio..."
          maxLength={300}
          onChange={(e) => handleChange(e.target.value, "bio")}
        ></textarea>
      </form>
      <Link to="/user" onClick={handleSubmit}>Submit</Link>
    </div>
  );
};

export default EditProfile;
