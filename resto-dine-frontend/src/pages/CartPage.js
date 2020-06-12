import React, { useState, useEffect } from 'react'
import CartItem from '../components/CartItem'
import Cookie from 'js-cookie'
import './CartPage.css'
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
function CartPage(props) {
    
    const [subTotal, setSubTotal] = useState(0);
    const food_item = Cookie.getJSON("food-item") || [];

    useEffect(() => {
        let product;
        if(props.cart.length !== 0) {
                product = props.cart
            let totalPrice = 0;
            product.forEach((item)=> {
                totalPrice += totalPrice = item.totalCost
            })
            setSubTotal(totalPrice);
        } else {
            setSubTotal(0);
        }
    }, [props.cart])
    
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
                                    <Link to="/shipping" ><button type="button" className="btn mb-2 checkout-btn text-uppercase font-weight-light">Proceed To Checkout</button></Link>
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
    cart: []
}
const mapStateToprops = state => {
    return {
        cart: state.cart.cartProduct
    }
}
export default connect(mapStateToprops, null)(CartPage);
