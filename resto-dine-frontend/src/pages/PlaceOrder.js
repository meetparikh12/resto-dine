import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import {store} from '../store/store';
import Cookie from 'js-cookie';
// import { CLEAR_CART } from '../actions/actionTypes';
// import { toast } from 'react-toastify';
// import config from 'react-global-configuration';
import OrderItem from '../components/OrderItem';
import './PlaceOrder.css';

function PlaceOrder(props){
    
    const [subTotal, setSubTotal] = useState(0);
    const {shippingDetails, paymentMethod, cart} = props;
    // const [isLoaded, setIsLoaded] = useState(false);
    const shippingPrice = subTotal > 1000 ? 0 : 100;
    const taxPrice = parseFloat((0.15 * subTotal).toFixed(2));
    const totalPrice = subTotal + shippingPrice + taxPrice;
    
    useEffect(()=> {
        
        if(!props.shippingDetails.address){
            // setIsLoaded(true);
            props.history.push('/shipping')
        } else if(!props.paymentMethod.method){
            // setIsLoaded(true);
            props.history.push('/payment')
        }

    }, [props.shippingDetails, props.paymentMethod, props.history])

    useEffect(() => {
        let product;
        if (props.cart.length !== 0) {
            product = props.cart
            let totalPrice = 0;
            product.forEach((item) => {
                totalPrice += totalPrice = item.totalCost
            })
            setSubTotal(totalPrice);
        } else {
            setSubTotal(0);
        }
    }, [props.cart])

    const placeOrderHandler = () => {
        const { shipping } = store.getState();
        const { shippingAddress, paymentMethod } = shipping;
        const {address, city, country, postalCode} = shippingAddress;
        const {method} = paymentMethod;
        const cartProduct = Cookie.getJSON("food-item") || [];
        const orderItems  = cartProduct.map(({_id: product, ...rest})=> ({ product, ...rest}));
        const orderDetails = {
            shipping: {address,city, country, postalCode}, 
            payment: {paymentMethod: method}, 
            itemPrice: subTotal,
            shippingPrice,
            taxPrice,   
            totalPrice,
            orderItems
        }
        // Axios.post(`${config.get('backend_url_orders')}`, orderDetails)
        // .then((res)=> {
        //     alert('Thank you for Shopping. Your Order ID is: ' +res.data.order._id);
        //     Cookie.remove("cartItems");
        //     store.dispatch({
        //         type: CLEAR_CART,
        //         payload: []
        //     })
        //     props.history.push(`/order/${res.data.order._id}`);
        // })
        // .catch((err)=> {
        //     toast.error(err.response.data.message, {
        //         position: toast.POSITION.BOTTOM_RIGHT,
        //         autoClose: 2000
        //     })
        // });
    }

    // if(!isLoaded){
    //     return <h4 className="text-center mt-5">Loading...</h4>
    // }
    return (
        <React.Fragment>
            <div className="order mb-5">
                <div className="order_page mb-5">
                    <div className="bg-img">
                        <div className="overlay-bg"></div>
                        <div className="overlay-content">
                            <h2 className="primary_heading">Order Page</h2>
                            <h3 className="secondary_heading">Confirm Your Order</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-lg-8" style={{marginTop: "2%"}}>
                        <div className="row">
                            <div className="card bg-light text-dark" style={{width: "90%", margin: "auto"}}>
                                <div className="card-body">
                                    <h5 className="card-title"><b>Shipping Address</b></h5>
                                    <p className="card-text">{shippingDetails.address}, {shippingDetails.city}, {shippingDetails.country}, {shippingDetails.postalCode}</p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="card bg-light text-dark" style={{width: "90%", margin: "auto"}}>
                                <div className="card-body">
                                    <h5 className="card-title"><b>Payment Method</b></h5>
                                    <p className="card-text">{paymentMethod.method}</p>
                                </div>
                            </div>
                        </div>   
                        <br/>
                        <div className="card bg-light text-dark" style={{width: "94%", margin: "auto"}}>   
                            <div className="card-body">
                                <h5 className="card-title"><b>Order Items</b></h5>
                                {cart.map((item)=> {
                                    return (
                                        <OrderItem key={item._id} item={item}/>
                                    )
                                })}
                            </div>      
                        </div>
                    </div>
                    <div className="col-lg-4" style={{margin: "2% 0", padding: "0%"}}>
                        <div className="card" style={{"width": "18rem", margin: "auto" }}>
                            <div className="card-body">
                                <h5 className="card-title"><b>Order Summary</b></h5>
                                <p className="card-text">Your Order: {subTotal}/- INR</p>
                                <p className="card-text">Shipping: {shippingPrice === 100 ? shippingPrice +"/- INR" : "Free"}</p>                                
                                <p className="card-text">Tax: {taxPrice}/- INR</p>
                                <h5 style={{color: "crimson"}} className="card-title">Total: {totalPrice}/- INR</h5>
                            </div>
                            <button onClick={placeOrderHandler} className="btn text-uppercase w-50 text-white font-weight-lighter btn-block mb-3" style={{backgroundColor: "#C81912"}}>Place Order</button>      
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

PlaceOrder.defaultProps = {
    shippingDetails: {},
    paymentMethod: {},
    cart: []
}
const mapStateToProps = state => {
    return {
        shippingDetails: state.shipping.shippingAddress,
        paymentMethod: state.shipping.paymentMethod,
        cart: state.cart.cartProduct
    }
}
export default connect(mapStateToProps,null)(PlaceOrder);