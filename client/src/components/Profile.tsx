import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbumsComponent } from "./TopAlbums";
import { TopArtistsComponent } from "./TopArtists";
import { Link } from 'react-router-dom';
import { Container, Typography, Card, Box, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

interface Follow {
  followedById: number;
  followingId: number;
  followedBy: User;
  following?: User;
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

  const [followers, setFollowers] = useState<Follow[]>([]);
  const [following, setFollowing] = useState<Follow[]>([]);

const loadPage = async () => {
    try {
      const { data: userData } = await axios.get("/api/user");
      setUser(userData);

      const { data: followersData } = await axios.get(`/api/followers/${userData.id}`);
      setFollowers(followersData);

      const { data: followingData } = await axios.get(`/api/following/${userData.id}`);
      setFollowing(followingData);
    } catch (error) {
      console.error("Error loading profile data", error);
    }
  };

  const deleteProfile = () => {
    let answer = prompt("Enter your username to delete:");
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

          <Box sx={{ mt: 3 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Followers</Typography>
            <List>
              {followers.map((follower) => (
                <ListItem key={follower.followedBy.id}>
                  <ListItemAvatar>
                    <Avatar src={follower.followedBy.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={follower.followedBy.name}
                    secondary={`@${follower.followedBy.username}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Following</Typography>
            <List>
              {following.map((followed) => (
                <ListItem key={followed.following?.id ?? followed.followedBy.id}>
                  <ListItemAvatar>
                    <Avatar src={followed.following?.image ?? followed.followedBy.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={followed.following?.name ?? followed.followedBy.name}
                    secondary={`@${followed.following?.username ?? followed.followedBy.username}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

        </Card>
        {user.id > 0 && <TopAlbumsComponent userId={user.id} />}
        {user.id > 0 && <TopArtistsComponent userId={user.id} />}
      </Box>
    </Container>
  );
};

export default Profile;
