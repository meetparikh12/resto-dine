import React, { useState, useEffect } from 'react'
import './SingleProduct.css'
import Footer from '../components/Footer'
import Cookie from 'js-cookie'
import { connect } from 'react-redux';
import { addToCart } from '../actions/actions';
import { store } from '../store/store';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from 'react-global-configuration'

function SingleProduct(props) {

    const [quantity, setQuantity] = useState(1);
    const [foodProduct, setFoodProduct] = useState({})
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        const foodId = props.match.params.foodId;
        axios.get(`${config.get('backend_url_products')}/` + foodId)
        .then((res)=> {
            setFoodProduct(res.data.foodProduct)
            setIsLoaded(true);
        })
        .catch((err)=> {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        })
    }, [props.match.params.foodId])

    const quantityHandler = event => {
        setQuantity(event.target.value)
    }

    const addToCartHandler = () => {
        const cartItems = Cookie.getJSON("food-item");
        let isItemInCart;
        if (!(!!cartItems)) {
            isItemInCart = false
        } else {
            isItemInCart = cartItems.find((item) => item.foodId === foodProduct._id);
        }
        if (isItemInCart) {
            alert('This item is already in your cart.');
            props.history.push('/cart')
            return;
        }
        const {name, image, price, _id} = foodProduct
        const food_item = {
            name, image, price, quantity, foodId: _id, totalCost : price * quantity
        }
        props.addItemToCart(food_item, props.history)
    }

    if(!isLoaded){
        return <div className="text-center mb-5" style={{margin: "20% auto"}}>
                <h1>Loading...</h1>
            </div>
    }
    return (
        <React.Fragment>
            <div className="single_product mb-5">
                <div className="bg-img">
                    <div className="overlay-bg"></div>
                    <div className="overlay-content">
                        <h2 className="primary_heading">{foodProduct.name}</h2>
                    </div>
                </div>
            </div>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        < img className = "img-fluid img-style"
                        src = {
                            `${config.get('backend_asset_url')}/${foodProduct.image}`
                        }
                        alt = "Food post" / >
                    </div>
                    <div className="col-md-6">
                        <h3 className="title font-weight-bold">{foodProduct.name}</h3>
                        <h4 className="text-danger font-weight-bold">{foodProduct.price}/- INR</h4>
                        <div className="wrapper">
                                { foodProduct.quantityInStock > 0 ? 
                                    <div className="showForm">
                                        <div className="form-group">
                                            <label className="font-weight-bold">Quantity:</label>
                                                {foodProduct.quantityInStock > 0 ? <select className="form-control quantity-selector" onChange={quantityHandler}>
                                                    {[...Array(foodProduct.quantityInStock).keys()].map((quantity)=> 
                                                        <option key={quantity+1} value={quantity+1}>{quantity+1}</option>
                                                    )}
                                                </select>: <span> 0</span>}
                                        </div> 
                                        <button className="btn btn-cart mb-3 text-uppercase font-weight-lighter" onClick={addToCartHandler} style={{color: "white"}}>Add To Cart</button>
                                            <div className="font-weight-bold mb-4">Available</div>
                                    </div>
                                : 
                                    <div className="font-weight-light mb-3">Sorry, The item is currently out of stock.</div>
                                }
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