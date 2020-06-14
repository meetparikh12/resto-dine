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
      </Router>
  );
}

export default App;
