import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LightDarkMode from "./LightDarkMode";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Container,
  Toolbar,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuIcon,
  SearchIcon,
  styled,
  alpha
} from "../style";
import logo from "./justvibelogo.png";
import theme from "../theme";
import axios from "axios";

const pages = ["Profile", "Feed"];

const Search = styled("div")(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
  display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: '11',
    transition: theme.transitions.create('width'),
    "&:focus": {
      width: '23ch',
    },
  },
}));

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleLogout = () => {
    axios.post('/api/logout')
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Just Vibe
      </Typography>
      <List>
        {pages.map((page) => (
          <ListItem key={page} component={Link} to={`/${page.toLowerCase()}`} button>
            <ListItemText primary={page} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" sx={{ backgroundColor: "#CB6CE6" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img src={logo} alt="Just Vibe Logo" height="100" />
            </Box>
            <Typography
              variant="h6"
              component={Link}
              to="/home"
              sx={{
                mr: 2,
                ...theme.typography.h6,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Just Vibe
            </Typography>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
            >
              <MenuIcon />
            </IconButton>
            <Search>
              <StyledInputBase
                placeholder="Search for an album or artist"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton
                type="submit"
                aria-label="search"
                component={Link}
                to={`/search-results/${searchQuery}`}
                onClick={() => setSearchQuery("")}
              >
                <SearchIcon />
              </IconButton>
            </Search>
            <LightDarkMode />
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={hamburgerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
