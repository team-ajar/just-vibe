import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Container, Box, Button, styled } from "../style";

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

const FollowingList = () => {
  const { userId } = useParams<{ userId: string }>();
  const [following, setFollowing] = useState<Follow[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/following/${userId}`)
      .then(response => setFollowing(response.data))
      .catch(error => console.error('Error fetching following', error));
  }, [userId]);

  const unfollowUser = (unfollowingId: number) => {
    axios.delete(`/api/follow/${userId}/${unfollowingId}`)
      .then(() => {
        setFollowing(following.filter(follow => follow.following.id !== unfollowingId));
      })
      .catch(error => console.error('Error unfollowing user', error));
  };

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Button variant="contained" onClick={() => navigate('/profile')} sx={{ mb: 2 }}>
        &larr; Back to Profile
      </Button>
      <Box sx={{ alignItems: "left" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>Following</Typography>
        <List>
          {following.map((followed) => (
            <StyledListItem key={followed.following.id}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Avatar src={followed.following.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={followed.following.name}
                  secondary={`@${followed.following.username}`}
                  onClick={() => navigate(`/profile/${followed.following.id}`)}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => unfollowUser(followed.following.id)}
              >
                Unfollow
              </Button>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default FollowingList;
