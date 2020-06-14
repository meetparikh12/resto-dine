import React, { useState, useEffect } from 'react'
import CartItem from '../components/CartItem'
import Cookie from 'js-cookie'
import './CartPage.css'
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Card from '../shared/components/UIElements/Card';
function CartPage(props) {
    
    const [subTotal, setSubTotal] = useState(0);
    const [cartRedirectPage, setCartRedirectPage] = useState("login");
    const food_item = Cookie.getJSON("food-item") || [];
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (props.loggedInUser.userId) {
            setCartRedirectPage("shipping");
        } else {
            setCartRedirectPage("login");
        }
    }, [props.loggedInUser]);

    useEffect(() => {
        let product;
        if(props.cart.length !== 0) {
                product = props.cart
            let totalPrice = 0;
            product.forEach((item)=> {
                totalPrice += totalPrice = item.totalCost
            })
            setSubTotal(totalPrice);
            setIsLoaded(true);
        } else {
            setSubTotal(0);
            setIsLoaded(true);
        }
    }, [props.cart])
    
    if(!isLoaded){
        return <div className="text-center mb-5" style={{margin: "20% auto"}}>
                <h1>Loading...</h1>
            </div>
    } else if(props.cart.length === 0) {
        return (
            <div className="container"> 
                <div className="row">
                <div className="col-md-12">
                <Card style={{width: "max-content", margin:"30% auto"}}>
                    <h4><i className="fa fa-shopping-cart" aria-hidden="true"></i> Sorry, Your Cart is empty.</h4>
                    <Link to="/food-products"><button type="button" className="btn mt-2 shopping-btn text-uppercase font-weight-light">Continue Shopping</button></Link>
                </Card>  
                </div>
                </div>
            </div> 
    )}
    return (
        <React.Fragment>
            <div className="cart mb-5">
                <div className="cart_products_banner mb-5">
                    <div className="bg-img">
                        <div className="overlay-bg"></div>
                        <div className="overlay-content">
                            <h2 className="primary_heading">Food Cart</h2>
                            <h3 className="secondary_heading">Your Items</h3>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <table className="table table-striped table-res">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Name</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {food_item.map((product => {
                                return <CartItem key={product.foodId}
                                id={product.foodId}
                                name={product.name}
                                image = {product.image}
                                price = {product.price}
                                quantity = {product.quantity}
                                totalCost = {product.totalCost}
                                />
                                }))
                            }
                        
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card checkout-box" style={{width: "18rem", margin: "2% auto"}}>
                                <div className="card-body">
                                    <h5 className="card-title font-weight-light">Subtotal: {subTotal}/- INR</h5>
                                    <Link to={`/${cartRedirectPage}`}><button type="button" className="btn mb-2 checkout-btn text-uppercase font-weight-light">Proceed To Checkout</button></Link>
                                    <Link to="/food-products"><button type="button" className="btn shopping-btn text-uppercase font-weight-light">Continue Shopping</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

CartPage.defaultProps = {
    cart: [],
    loggedInUser: {}

}
CartPage.propTypes = {
    cart: PropTypes.array.isRequired
}
const mapStateToProps = state => {
    return {
        cart: state.cart.cartProduct,
        loggedInUser: state.user.userInfo
    }
}
export default connect(mapStateToProps, null)(CartPage);