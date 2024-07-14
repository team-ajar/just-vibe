import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Card, Box, Avatar, Button } from "../style";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const OtherProfile = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
    bio: "",
    image: "",
  });
  const { userId } = useParams<{ userId: string }>();
  const [baseUser, setBaseUser] = useState<User>({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
    bio: "",
    image: "",
  });
  const [follows, setFollows] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadPage = () => {
    axios
      .get(`/api/user/${userId}`)
      .then(({ data }: any) => {
        // console.log(data);
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const followUser = (following: any) => {
    axios.post(`/api/follow/${baseUser.id}/${following}`)
      .then(() => (
        axios
        .get(`/api/following/${baseUser.id}`)
        .then((response) => setFollows(response.data))
        .catch((error) => console.error("Error fetching follows", error))
      ));
    // return loadUser();
  };

  const unfollowUser = (unfollowing: any) => {
    axios.delete(`/api/follow/${baseUser.id}/${unfollowing}`)
    .then(() => (
      axios
      .get(`/api/following/${baseUser.id}`)
      .then((response) => setFollows(response.data))
      .catch((error) => console.error("Error fetching follows", error))
    ));
    // return loadUser();
  };

  useEffect(() => {
    loadPage();

    axios
      .get("/api/user")
      .then(({ data }: any) => {
        // console.log(data);
        setBaseUser(data);
      })
      .catch((err) => console.error(err));

    axios
      .get(`/api/following/${baseUser.id}`)
      .then((response) => setFollows(response.data))
      .catch((error) => console.error("Error fetching follows", error));
  }, [userId]);

  return (
    <Container
      sx={{ p: 2, mt: 3, display: "flex", justifyContent: "center", m: 4 }}
    >
      <Box>
        <Typography variant="h1" sx={{ mb: 2 }}>
          {user.username}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
          <Card
            sx={{
              maxWidth: 600,
              p: 3,
              boxShadow: "10px 10px 0px #000",
              border: "2px solid #000",
              width: isMobile ? 400 : 600,
            }}
          >
            <Box
              sx={{
                display: "flex",
                // justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={user.image}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h3" sx={{ mb: 1 }}>
                @{user.username}
              </Typography>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {user.bio ? user.bio : ""}
              </Typography>
              {follows.some(
                (followed: any) => followed.followingId === baseUser.id
              ) ? (
                <Button variant="contained" color="primary" onClick={() => unfollowUser(user.id)}>
                  Unfollow
                </Button>
              ) : (
                <Button variant="contained" color="secondary" onClick={() => followUser(user.id)}>
                  Follow
                </Button>
              )}
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              {/* <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Followers
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={`/profile/followers/${user.id}`}
                >
                  View Followers
                </Button>
              </Box> */}

              {/* <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Following
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={`/profile/following/${user.id}`}
                >
                  View Following
                </Button>
              </Box> */}
            </Box>
          </Card>
        </Box>
        {/* <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
          <TopAlbumsComponent />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
          <TopArtistsComponent />
        </Box> */}
      </Box>
    </Container>
  );
};

export default OtherProfile;
