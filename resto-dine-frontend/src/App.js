import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Landing from './pages/Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodProduct from './pages/FoodProduct';
import SingleProduct from './pages/SingleProduct';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import OrderDetail from './pages/OrderDetail';
import jwt_decode from 'jwt-decode';
import setJwtToken from './shared/securityUtils/setJwtToken';
import { store } from './store/store';
import { SET_USER_INFO } from './actions/actionTypes';
import FoodCategory from './pages/FoodCategory';

const token = localStorage.getItem("jwt-token");
if (token) {
  const deocded_token = jwt_decode(token);
  setJwtToken(token);
  store.dispatch({
    type: SET_USER_INFO,
    payload: deocded_token
  })

  if (deocded_token.exp < Date.now() / 1000) {
    localStorage.removeItem("jwt-token");
    setJwtToken(false);
    store.dispatch({
      type: SET_USER_INFO,
      payload: {}
    })
    window.location.href = '/login';
  }
}

function App() {
  return (
      <Router>        
          <MainNavigation/>
          <Route exact path="/" component={Landing}/>
          <Route exact path="/food-products" component={FoodProduct}/>
          <Route exact path="/food-item/:foodId" component={SingleProduct}/>
          <Route exact path="/cart" component={CartPage}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/shipping" component={Shipping}/>
          <Route exact path="/payment" component={Payment}/>
          <Route exact path="/place-order" component={PlaceOrder}/>
          <Route exact path="/order/:orderId" component={OrderDetail}/>
          <Route exact path="/foodCategory/:category" component={FoodCategory}/>
      </Router>
  );
}

export default App;
