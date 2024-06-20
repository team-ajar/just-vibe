import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbumsComponent } from "./TopAlbums";
import { TopArtistsComponent } from "./TopArtists";
import { Link } from 'react-router-dom';
import { Container, Typography, Card, Box, Button, Avatar } from "@mui/material";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const Profile = () => {
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
      .catch((err) => console.error(err));
  };

  const deleteProfile = () => {
    let answer = prompt("enter your username to delete:");
    const delUser = {
      id: 0,
      googleId: "",
      location: "",
      name: "",
      username: "",
      bio: "",
      image: "",
    };
    if (answer === user.username) {
      axios.delete(`/api/user/${user.id}`).then(() => setUser(delUser));
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Box sx={{ alignItems: "left" }}>
        <Typography variant="h1" sx={{ mb: 2 }}>Profile</Typography>
        <Card sx={{ maxWidth: 600, p: 3, boxShadow: "10px 10px 0px #000", border: "2px solid #000" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar src={user.image} sx={{ width: 120, height: 120, mb: 2 }} />
            <Typography variant="h3" sx={{ mb: 1 }}>@{user.username}</Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>{user.name}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{user.bio ? user.bio : "Add a bio"}</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" component={Link} to={`/profile/edit/${user.id}`}>
                Edit Profile
              </Button>
              <Button variant="contained" color="secondary" onClick={deleteProfile}>
                Delete Profile
              </Button>
            </Box>
          </Box>
        </Card>
        {user.id > 0 && <TopAlbumsComponent userId={user.id} />}
        {user.id > 0 && <TopArtistsComponent userId={user.id} />}
      </Box>
    </Container>
  );
};

export default Profile;
