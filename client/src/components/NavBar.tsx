import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LightDarkMode from './LightDarkMode';
import { AppBar, Box, IconButton, Typography, Container, Button, Toolbar, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import logo from './justvibelogo.png';
import theme from '../theme';

const pages = ['Profile', 'Feed'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginRight: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    paddingLeft: theme.spacing(6),
  },
}));

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppBar position="static" sx={{ backgroundColor: '#CB6CE6' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={logo} alt="Just Vibe Logo" height="100" />
          </Box>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              ...theme.typography.h6,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Just Vibe
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ color: 'white', display: 'block' }}
                component={Link}
                to={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              type="submit"
              aria-label="search"
              component={Link}
              to={`/search-results/${searchQuery}`}
              onClick={() => setSearchQuery('')}
            >
              <SearchIcon />
            </IconButton>
          </Search>
          <LightDarkMode />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
