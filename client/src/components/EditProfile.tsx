import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from "../style";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const EditProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const loadPage = () => {
    axios
      .get(`/api/user`)
      .then(({ data }: any) => {
        setUser(data);
        setName(data.name);
        setUsername(data.username);
        setBio(data.bio);
      })
      .catch((err: any) => console.error(err));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      axios.patch(`/api/user/${user.id}`, {
        username: username.length ? username : user.username,
        name: name.length ? name : user.name,
        bio: bio.length ? bio : user.bio
      })
      .then(() => {
        navigate('/profile');
      })
      .catch((err: any) => console.error(err));
    }
  }

  useEffect(() => {
    loadPage();
  }, [])

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>Edit Profile</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          multiline
          rows={2}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mr: 2 }}>
          Submit
        </Button>
        <Button component={Link} to="/profile" variant="outlined" color="primary">
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default EditProfile;
