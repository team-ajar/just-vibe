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
  Modal,
} from "../style";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadPage = () => {
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

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <Container
      sx={{ p: 2, mt: 3, m: 4,}}
    >
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          top: isMobile ? "10%" : "10%",
          left: isMobile ? "10%" : "25%",
          width: isMobile ? "100%" : "100%",
          display: isMobile ? "block" : "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            // width: 0.25,
            // height: 0.25,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: "5px 5px 0px #000",
            p: 10,
            // alignContent: "center",
            position: isMobile ? "" : "fixed",
            top: "25%",
            left: "25%",
          }}
        >
          <Typography variant="h4">
            Are you sure you want to delete your account?
          </Typography>
          <Button onClick={deleteProfile} color="primary" variant="contained">
            Delete
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Box sx={{alignItems: "flex-start", alignContent: "center"}}>
        <Typography variant="h1" sx={{ mb: 2, display: "flex", justifyContent: "center", }}>
          Profile
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
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
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
          <TopAlbumsComponent />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
          <TopArtistsComponent />
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
