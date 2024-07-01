import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LightDarkMode from "./LightDarkMode";
import {
  AppBar,
  Box,
  IconButton,
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
import axios from "axios";
import { PaletteMode } from "@mui/material";

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
    width: '11ch',
    transition: theme.transitions.create('width'),
    "&:focus": {
      width: '23ch',
    },
  },
}));

const NavBar = ({toggle, mode}: {toggle: () => void, mode: PaletteMode}) => {
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
      <List>
        <ListItem component={Link} to="/home" button>
          <ListItemText primary="Home" />
        </ListItem>
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

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      setSearchQuery('');
      return navigate(`/search-results/${searchQuery}`);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" sx={{ backgroundColor: "#CB6CE6" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
              <Link to="/home">
                <img src={logo} alt="Just Vibe Logo" height="50" />
              </Link>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Search sx={{ justifySelf: "end" }}>
                <StyledInputBase
                  placeholder="Search for an album or artist"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
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
              <LightDarkMode toggle={toggle} mode={mode} />
            </Box>
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
            display: "block",
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
