import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Container,
  Box,
  styled,
  Button,
} from "../style";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const FollowersList = () => {
  const { userId } = useParams<{ userId: string }>();
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [follows, setFollows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/followers/${userId}`)
      .then((response) => setFollowers(response.data))
      .catch((error) => console.error("Error fetching followers", error));

    axios
      .get(`/api/following/${userId}`)
      .then((response) => setFollows(response.data))
      .catch((error) => console.error("Error fetching follows", error));
  }, [userId]);

  const followUser = (followingId: number) => {
    axios
      .post(`/api/follow/${userId}/${followingId}`)
      .then(() => (
        axios
        .get(`/api/following/${userId}`)
        .then((response) => setFollows(response.data))
        .catch((error) => console.error("Error fetching follows", error))
      ))
      .catch((error) => console.error("Error unfollowing user", error));
  };

  const unfollowUser = (unfollowingId: number) => {
    axios
      .delete(`/api/follow/${userId}/${unfollowingId}`)
      .then(data => (
        axios
        .get(`/api/following/${userId}`)
        .then((response) => setFollows(response.data))
        .catch((error) => console.error("Error fetching follows", error))
      ))
      .catch(err => console.error(err));
  }

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Button
        variant="contained"
        onClick={() => navigate("/profile")}
        sx={{ mb: 2 }}
      >
        &larr; Back to Profile
      </Button>
      <Box sx={{ alignItems: "left" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Followers
        </Typography>
        <List>
          {followers.map((follower) => (
            <StyledListItem key={follower.followedBy.id}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemAvatar>
                  <Avatar src={follower.followedBy.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={follower.followedBy.name}
                  secondary={`@${follower.followedBy.username}`}
                />
              </Box>
              
              {follows.some(
                (follow: any) => follower.followedById === follow.followingId
              ) ? (
                <Button
                variant="contained"
                color="secondary"
                onClick={() => unfollowUser(follower.followedBy.id)}
              >
                Unfollow
              </Button>
              ) : (
                <Button
                variant="contained"
                color="primary"
                onClick={() => followUser(follower.followedBy.id)}
              >
                Follow
              </Button>
              )
              }
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default FollowersList;
