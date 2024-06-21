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
  followedBy: User;
}

const FollowersList = () => {
  const { userId } = useParams<{ userId: string }>();
  const [followers, setFollowers] = useState<Follow[]>([]);

  useEffect(() => {
    axios.get(`/api/followers/${userId}`)
      .then(response => setFollowers(response.data))
      .catch(error => console.error('Error fetching followers', error));
  }, [userId]);

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Box sx={{ alignItems: "left" }}>
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
    </Container>
  );
};

export default FollowersList;
