import React from 'react';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <div>
      <h1>Welcome to Just Vibe!</h1>
      <p>
        Just Vibe is an app where you can get groovy with your friends! With Just Vibe, you can create a profile, search and save your favorite albums/artists, write reviews on your favorite (or not so favorite) albums, set an album of the day, and follow your friends to see what they're grooving out to!
      </p>
      <p>Log in below!</p>
      <Button variant="contained" color="primary" href="/auth/google">
        Log In With Google
      </Button>
    </div>
  );
};

export default Login;
