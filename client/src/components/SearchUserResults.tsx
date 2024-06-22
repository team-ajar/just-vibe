import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Button, styled } from "../style";

const StyledListItem = styled("li")(({ theme }) => ({
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

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const SearchUsers = () => {
  const { query, userId } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
  });
  const [follows, setFollows] = useState([]);
  const navigate = useNavigate();

  const loadUser = () => {
    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));

      // axios
      //   .get(`/api/following/${userId}`)
      //   .then((response) => setFollows(response.data))
      //   .catch((error) => console.error("Error fetching follows", error));
  };

  useEffect(() => {
    loadUser();

    fetch(`/api/search/users/${userId}/${query}`)
      .then((data: any) => data.json())
      .then((response: any) => {
        setSearchResults(response);
      })
      .catch((err: any) => console.error(err));

      axios
        .get(`/api/following/${userId}`)
        .then((response) => setFollows(response.data))
        .catch((error) => console.error("Error fetching follows", error));
  }, [query]);

  const followUser = (following: any) => {
    return axios.post(`/api/follow/${user.id}/${following}`)
      .then(() => (
        axios
        .get(`/api/following/${userId}`)
        .then((response) => setFollows(response.data))
        .catch((error) => console.error("Error fetching follows", error))
      ));
    // return loadUser();
  };

  const unfollowUser = (unfollowing: any) => {
    return axios.delete(`/api/follow/${user.id}/${unfollowing}`)
    .then(() => (
      axios
      .get(`/api/following/${userId}`)
      .then((response) => setFollows(response.data))
      .catch((error) => console.error("Error fetching follows", error))
    ));
    // return loadUser();
  }

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Button
        variant="contained"
        onClick={() => navigate("/feed")}
        sx={{ mb: 2 }}
      >
        &larr; Back to Feed
      </Button>
      <Typography variant="h1" gutterBottom>
        Users:
      </Typography>
      <Box component="ul" p={0} m={0}>
        {searchResults.map((foundUser: User, index: number) => {
          console.log('search results: ', searchResults);
          console.log('follows: ', follows);
          return (
          <StyledListItem key={index}>
            <Typography variant="body1">{`@${foundUser.username} - ${foundUser.name}`}</Typography>
            <div>
              {follows.some(
                (followedUser: any) => followedUser.followingId === foundUser.id
              ) ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => unfollowUser(foundUser.id)}
                  sx={{ marginLeft: 2 }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => followUser(foundUser.id)}
                >
                  Follow
                </Button>
              )}
            </div>
          </StyledListItem>
        )})}
      </Box>
    </Container>
  );
};

export default SearchUsers;
