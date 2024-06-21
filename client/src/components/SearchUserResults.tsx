import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Button, styled } from "../style";

const StyledListItem = styled('li')(({ theme }) => ({
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

const SearchUsers = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState({id: 0, googleId: '', location: '', name: '', username: '' });
  const navigate = useNavigate();

  const loadUser = () => {
    axios.get('/api/user')
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadUser();

    fetch(`/api/search/users/${query}`)
      .then((data: any) => data.json())
      .then((response: any) => {
        setSearchResults(response);
      })
      .catch((err: any) => console.error(err));
  }, [query]);

  const followUser = (following: any) => {
    axios.post(`/api/follow/${user.id}/${following}`);
  };

  const unfollowUser = (unfollowing: any) => {
    axios.delete(`/api/follow/${user.id}/${unfollowing}`);
  }

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Button variant="contained" onClick={() => navigate('/feed')} sx={{ mb: 2 }}>
        &larr; Back to Feed
      </Button>
      <Typography variant="h1" gutterBottom>Users:</Typography>
      <Box component="ul" p={0} m={0}>
        {searchResults.map((user: any, index: number) => (
          <StyledListItem key={index}>
            <Typography variant="body1">{`@${user.username} - ${user.name}`}</Typography>
            <div>
              <Button variant="contained" color="primary" onClick={() => followUser(user.id)}>Follow</Button>
              <Button variant="contained" color="secondary" onClick={() => unfollowUser(user.id)} sx={{ marginLeft: 2 }}>Unfollow</Button>
            </div>
          </StyledListItem>
        ))}
      </Box>
    </Container>
  );
};

export default SearchUsers;
