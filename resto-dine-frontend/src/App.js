import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Landing from './pages/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>        
          <MainNavigation/>
            <Landing/>
      </Router>
  );
}

export default App;
