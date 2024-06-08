import * as React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
// import in component files
import NavBar from './NavBar';
import HomePage from './HomePage';
import SearchResults from './SearchResults';
import Reviews from './Reviews'

const App = () => {

  



  return (
    <div>
      {/* show NavBar in every view of app */}
      <NavBar />
      {/* routes to each view */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/search-results/:query' element={<SearchResults />} />
        {/* <Route path='/' element={<Reviews />} /> */}
      </Routes>
    </div>
  )

};

export default App;
