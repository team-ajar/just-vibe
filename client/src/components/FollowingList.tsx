import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Container, Box } from '@mui/material';

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
  following: User;
}

const FollowingList = () => {
  const { userId } = useParams<{ userId: string }>();
  const [following, setFollowing] = useState<Follow[]>([]);

  useEffect(() => {
    axios.get(`/api/following/${userId}`)
      .then(response => setFollowing(response.data))
      .catch(error => console.error('Error fetching following', error));
  }, [userId]);

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Box sx={{ alignItems: "left" }}>
        <Typography variant="h1" sx={{ mb: 2 }}>Following</Typography>
        <List>
          {following.map((followed) => (
            <ListItem key={followed.following.id}>
              <ListItemAvatar>
                <Avatar src={followed.following.image} />
              </ListItemAvatar>
              <ListItemText
                primary={followed.following.name}
                secondary={`@${followed.following.username}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default FollowingList;
