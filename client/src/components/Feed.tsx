import React, { ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Reactions from "./Reactions";
import { Container, Typography, Card, CardContent, CardMedia, Button, Box, InputBase, Grid, SearchIcon, styled, alpha } from "../style";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
}

interface Album {
  id: number;
  albumName: string;
  artistName: string;
  image: string;
}

interface Review {
  username: ReactNode;
  Album: Album;
  id: number;
  text: string;
  rating: number;
  userId: number;
  albumId: number;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  [theme.breakpoints.up("sm")]: {
    width: "31ch",
  },
  "& .MuiInputBase-input": {
    paddingLeft: theme.spacing(6),
  },
}));

const Feed = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User>({id: 0, googleId: '', location: '', name: '', username: '' });
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  const loadUser = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch(err => console.error(err));
  };

  const loadReviews = (userId: number) => {
    axios.get(`/api/feed/reviews/${userId}`)
      .then((response: any) => {
        setReviews(response.data);
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e: any) => {
    setQuery(e);
  };

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      setQuery('');
      return navigate(`/search/users/${query}`);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user.id !== 0) {
      loadReviews(user.id);
    }
  }, [user]);

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Typography variant="h1" gutterBottom>Feed</Typography>
      <Box display="flex" mb={2}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for a user by username"
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </Search>
        <Button variant="contained" color="primary" component={Link} to={`/search/users/${query}`}>
          Search Users
        </Button>
      </Box>
      <Typography variant="h2" gutterBottom>Reviews From People You Follow</Typography>
      {reviews.length > 0 ? (
        <Grid container spacing={5}>
          {reviews.map(review => (
            <Grid item xs={12} sm={6} md={4} key={review.id}>
              <Card sx={{ width: '100%' }}>
                {review.Album ? (
                  <>
                    <CardMedia
                      component="div"
                      sx={{
                        paddingTop: '100%',
                        backgroundImage: `url(${review.Album.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <CardContent>
                      <Typography variant="h3">{review.Album.albumName} by {review.Album.artistName}</Typography>
                    </CardContent>
                  </>
                ) : (
                  <CardContent>
                    <Typography variant="body1">No album information available</Typography>
                  </CardContent>
                )}
                <CardContent>
                  <Typography variant="body1">@{review.username}: {review.text}</Typography>
                  <Reactions userId={user.id} postId={review.id} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No reviews to display</Typography>
      )}
    </Container>
  )
};

export default Feed;
