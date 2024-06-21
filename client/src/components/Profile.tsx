import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbumsComponent } from "./TopAlbums";
import { TopArtistsComponent } from "./TopArtists";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  Avatar,
  Snackbar,
  Modal,
} from "@mui/material";

interface User {
  id: number;
  googleId: string;
  location: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const Profile = () => {
  const location = useLocation();
  const [user, setUser] = useState<User>({
    id: 0,
    googleId: "",
    location: "",
    name: "",
    username: "",
    bio: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loadPage = () => {
    // console.log("state: ", location);

    axios
      .get("/api/user")
      .then(({ data }: any) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  };

  const deleteProfile = () => {

    const delUser = {
      id: 0,
      googleId: "",
      location: "",
      name: "",
      username: "",
      bio: "",
      image: "",
    };
    axios.delete(`/api/user/${user.id}/${user.googleId}`).then(() => setUser(delUser)).catch((err: any) => console.error(err));
    handleClose();
    return navigate('/');
  };

  // const handleEditClick = () => {
  //   return navigate(`/profile/edit/${user.id}`);
  // };


  useEffect(() => {
    loadPage();
    // console.log('state: ', location);
  }, []);

  return (
    <Container sx={{ p: 2, mt: 3 }}>
      <Modal open={open} onClose={handleClose}>
        <Box
          height={200}
          width={200}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          // sx={}
        >
          <Typography variant="h2">Are you sure you want to delete your account?</Typography>
          <Button onClick={deleteProfile}>Delete</Button>
        </Box>
      </Modal>
      <Box sx={{ alignItems: "left" }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Profile
        </Typography>
        <Card
          sx={{
            maxWidth: 600,
            p: 3,
            boxShadow: "10px 10px 0px #000",
            border: "2px solid #000",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src={user.image} sx={{ width: 120, height: 120, mb: 2 }} />
            <Typography variant="h3" sx={{ mb: 1 }}>
              @{user.username}
            </Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.bio ? user.bio : "Add a bio"}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                component={Link}
                to={`/profile/edit/${user.id}`}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
              >
                Delete Profile
              </Button>
            </Box>
          </Box>
        </Card>
        {user.id > 0 && <TopAlbumsComponent userId={user.id} />}
        {user.id > 0 && <TopArtistsComponent userId={user.id} />}
      </Box>
    </Container>
  );
};

export default Profile;
