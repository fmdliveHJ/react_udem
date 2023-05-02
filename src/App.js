import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return (
    <>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path='/' element={<Users />}></Route>
            <Route path='/:userId/places' element={<UserPlaces />}></Route>
            <Route path='/places/new' element={<NewPlace />}></Route>
            <Route path='/places/:placeId' element={<UpdatePlace />}></Route>
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
