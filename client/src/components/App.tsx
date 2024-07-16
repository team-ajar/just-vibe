import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from './NavBar';
import HomePage from './HomePage';
import SearchResults from './SearchResults';
import Reviews from './Reviews'
import Profile from './Profile';
import Feed from './Feed';
import SearchUsers from './SearchUserResults';
import EditProfile from './EditProfile';
import Login from './Login';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import OtherProfile from './OtherUser';
import { light, dark } from "../theme";
import { CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const [mode, setMode] = React.useState<PaletteMode>("light");
  const toggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = React.useMemo(
    () => createTheme(mode === "light" ? light : dark),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div>
      {!isLoginPage && <NavBar toggle={toggle} mode={mode} />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/search-results/:query' element={<SearchResults />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/search/users/:userId/:query' element={< SearchUsers />} />
        <Route path='/profile/edit/:id' element={<EditProfile/>} />
        <Route path='/profile/followers/:userId' element={<FollowersList />} />
        <Route path='/profile/following/:userId' element={<FollowingList />} />
        <Route path='/profile/:userId' element={<OtherProfile />} />
      </Routes>
    </div>
    </ThemeProvider>
  )
};

export default App;
