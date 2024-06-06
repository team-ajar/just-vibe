import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SearchResults from './SearchResults';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search-results' element={<SearchResults />} />
      </Routes>
    </div>
  )
};

export default App;