import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Container, Box, styled, Button } from "../style";

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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const FollowersList = () => {
  const { userId } = useParams<{ userId: string }>();
  const [followers, setFollowers] = useState<Follow[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/followers/${userId}`)
      .then(response => setFollowers(response.data))
      .catch(error => console.error('Error fetching followers', error));
  }, [userId]);

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Button variant="contained" onClick={() => navigate('/profile')} sx={{ mb: 2 }}>
        &larr; Back to Profile
      </Button>
      <Box sx={{ alignItems: "left" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>Followers</Typography>
        <List>
          {followers.map((follower) => (
            <StyledListItem key={follower.followedBy.id}>
              <ListItemAvatar>
                <Avatar src={follower.followedBy.image} />
              </ListItemAvatar>
              <ListItemText
                primary={follower.followedBy.name}
                secondary={`@${follower.followedBy.username}`}
              />
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default FollowersList;
