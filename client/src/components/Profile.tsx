import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopAlbumsComponent } from "./TopAlbums";
import { TopArtistsComponent } from "./TopArtists";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Snackbar, Modal } from "@mui/material";
import { Container, Typography, Card, Box, Button, Avatar } from "../style";

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
    axios
      .delete(`/api/user/${user.id}`)
      .then(() => setUser(delUser))
      .catch((err: any) => console.error(err));
    handleClose();
    return navigate("/");
  };

  // const handleEditClick = () => {
  //   return navigate(`/profile/edit/${user.id}`);
  // };

  useEffect(() => {
    loadPage();
    // console.log('state: ', location);
  }, []);

  return (
    <Container sx={{ p: 2, mt: 3, display: "flex", justifyContent: "center" }}>
      <Modal open={open} onClose={handleClose} sx={{
        display: "flex",
        justifyContent: "center",
      }}>
        <Box
          sx={{
            width: 0.5,
            height: 0.5,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: "5px 5px 0px #000",
            p: 20
          }}
        >
          <Typography variant="h4">
            Are you sure you want to delete your account?
          </Typography>
          <Button onClick={deleteProfile} color="primary" variant="contained">Delete</Button>
        </Box>
      </Modal>
      <Box >
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
              // justifyContent: "center",
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
                color="secondary"
                component={Link}
                to={`/profile/edit/${user.id}`}
              >
                Edit Profile
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
              >
                Delete Profile
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Box sx={{ flex: 1, textAlign: "center" }}>
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
            </Box>

            <Box sx={{ flex: 1, textAlign: "center" }}>
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
            </Box>
          </Box>
        </Card>
        <TopAlbumsComponent/>
        <TopArtistsComponent/>
      </Box>
    </Container>
  );
};

export default Profile;
