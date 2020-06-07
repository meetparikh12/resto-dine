import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Landing from './pages/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodProduct from './pages/FoodProduct';

function App() {
  return (
      <Router>        
          <MainNavigation/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/food-products" component={FoodProduct}/>

      </Router>
  );
}

export default App;
