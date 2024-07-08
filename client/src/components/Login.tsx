import React, { useEffect } from 'react';
import { Container, Typography, Button, Box } from "../style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./justvibelogo.png";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/checkAuth')
      .then(response => {
        if (response.data.isAuthenticated) {
          navigate('/home');
        }
      })
      .catch(error => {
        console.error('Error checking authentication status:', error);
      });
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ p: 2, mt: 3, textAlign: 'center' }}>
      <Box sx={{ mb: 2 }}>
        <img src={logo} alt="Just Vibe Logo" height="150" />
      </Box>
      <Typography variant="body1" gutterBottom>
        Just Vibe is an app where you can get groovy with your friends! With Just Vibe, you can create a profile, search and save your favorite albums/artists, write reviews on your favorite (or not so favorite) albums, set an album of the day, and follow your friends to see what they're grooving out to!
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" href="/auth/google">
          Log In With Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
