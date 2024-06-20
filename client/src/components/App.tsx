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

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div>
      {!isLoginPage && <NavBar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/search-results/:query' element={<SearchResults />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/search/users/:query' element={< SearchUsers />} />
        <Route path='/profile/edit/:id' element={<EditProfile/>} />
      </Routes>
    </div>
  )
};

export default App;
