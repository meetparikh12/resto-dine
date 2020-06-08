import React, { useState } from 'react'
import './SingleProduct.css'
import Footer from '../components/Footer'
import Cookie from 'js-cookie'
import { connect } from 'react-redux';
import { addToCart } from '../actions/actions';
import { store } from '../store/store';

function SingleProduct(props) {

    const [quantity, setQuantity] = useState(1);
    const food_product = {};
    let quantityInStock = 6;
    const {name, image, price} = props.location.state;
    const {foodId} = props.match.params;
    if(!(!!props.location.state)){
        food_product.name = "";
        food_product.price = 0;
        food_product.image = "";
    } else {
        food_product.name = name;
        food_product.price = price;
        food_product.image = image;
    }
    
    const quantityHandler = event => {
    setQuantity(event.target.value)
    }

    const addToCartHandler = () => {
        const {name, image, price} = food_product
        const food_item = {
            name, image, price, quantity,foodId, totalCost : price * quantity
        }
        props.addItemToCart(food_item, props.history)
    }

    return (
        <React.Fragment>
            <div className="single_product mb-5">
                <div className="bg-img">
                    <div className="overlay-bg"></div>
                    <div className="overlay-content">
                        <h2 className="primary_heading">{food_product.name}</h2>
                    </div>
                </div>
            </div>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-fluid img-style" src={food_product.image} alt="Food post"/>
                    </div>
                    <div className="col-md-6">
                        <h3 className="title font-weight-bold">{food_product.name}</h3>
                        <h4 className="text-danger font-weight-bold">{food_product.price}/- INR</h4>
                        <div className="wrapper">
                                <div className="form-group">
                                    <label className="font-weight-bold">Quantity:</label>
                                        {quantityInStock > 0 ? <select className="form-control quantity-selector" onChange={quantityHandler}>
                                            {[...Array(quantityInStock).keys()].map((quantity)=> 
                                                <option key={quantity+1} value={quantity+1}>{quantity+1}</option>
                                            )}
                                        </select>: <span> 0</span>}
                                </div> 
                                <button className="btn btn-cart mb-3 text-uppercase font-weight-lighter" onClick={addToCartHandler} style={{color: "white"}}>Add To Cart</button>
                                <div className="font-weight-bold mb-4">Available</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
const mapDispatchToProps = dispatchEvent => {
    return {
        addItemToCart : (product, history) => {
            dispatchEvent(addToCart(product))
            const {cart} = store.getState();
            Cookie.set("food-item", JSON.stringify(cart.cartProduct));
            history.push('/cart');
        }   
    }
}
export default connect(null, mapDispatchToProps)(SingleProduct);