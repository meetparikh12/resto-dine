import React, { Component } from 'react'
// import Axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
// import config from 'react-global-configuration';
// import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import OrderItem from '../components/OrderItem';
// toast.configure();  
import './OrderDetail.css'
import Footer from '../components/Footer';
class OrderDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            shippingDetails: {},
            orderItems: [],
            subTotal: 0,
            shippingPrice: 0,
            taxPrice: 0,
            totalPrice: 0,
            payment: {},
            isDelivered: false,
            isPaid: false,
            // isLoaded: false
        }
        this.handleToken = this.handleToken.bind(this);
    }

    componentDidMount(){
        // const {orderId} = this.props.match.params;
        const {orderDetails} = this.props;
        if(!orderDetails.shipping || !orderDetails.payment ) {
            this.props.history.push('/shipping')
        }
        const {shipping, payment, orderItems, itemPrice, taxPrice, totalPrice, shippingPrice} = orderDetails;
        this.setState({
            shippingDetails: shipping, 
            payment,
            orderItems: orderItems,
            subTotal: itemPrice,
            taxPrice,
            totalPrice,
            shippingPrice
            // isDelivered,
            // isPaid
            // isLoaded: true
        })

        // Axios.get(`${config.get('backend_url_orders')}/` +orderId)
        // .then((res)=> {
        //     const {shipping, payment, orderItems, itemPrice, taxPrice, totalPrice, shippingPrice, isDelivered, isPaid} = res.data.order;
        //     this.setState({
        //         shippingDetails: shipping, 
        //         payment,
        //         orderItems: orderItems,
        //         subTotal: itemPrice,
        //         taxPrice,
        //         totalPrice,
        //         shippingPrice,
        //         isDelivered,
        //         isPaid,
        //         isLoaded: true
        //     })
        // })
        // .catch((err)=> {
        //     toast.error(err.response.data.message, {
        //         position: toast.POSITION.BOTTOM_RIGHT,
        //         autoClose: 2000
        //     })
        // })
    }

    handleToken(token){
    
        const {totalPrice} = this.state;
        const {orderId} = this.props.match.params;
        // Axios.patch(`${config.get('backend_url_orders')}/${orderId}/pay`, {
        //     token,
        //     totalPrice
        // })
        // .then((res)=> {
        //     toast.success('Payment '+res.data.status +'!', {
        //         position: toast.POSITION.BOTTOM_RIGHT,
        //         autoClose: 2000
        //     })
        //     this.props.history.push('/orders');
        //     this.setState({
        //         isPaid: !this.state.isPaid
        //     })
        // })
        // .catch((err)=> {
        //     toast.error(err.response.data.message, {
        //         position: toast.POSITION.BOTTOM_RIGHT,
        //         autoClose: 2000
        //     })
        // });
     }

    render() {
        // if(!this.state.isLoaded){
        //     return <h4 className="text-center mt-5">Loading...</h4>
        // }
        return (
            <React.Fragment>
                <div className="order_info mb-5">
                    <div className="order_details mb-5">
                        <div className="bg-img">
                            <div className="overlay-bg"></div>
                            <div className="overlay-content">
                                <h2 className="primary_heading">Order Info</h2>
                                <h3 className="secondary_heading">Your Order Details</h3>
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
                                        <p className="card-text">{this.state.shippingDetails.address}, {this.state.shippingDetails.city}, {this.state.shippingDetails.country}, {this.state.shippingDetails.postalCode}</p>
                                        {this.state.isDelivered === true ? <h6><b>Delivered</b></h6> : <h6><b>Not Delivered</b></h6>}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="card bg-light text-dark" style={{width: "90%", margin: "auto"}}>
                                    <div className="card-body">
                                        <h5 className="card-title"><b>Payment Method</b></h5>
                                        <p className="card-text">{this.state.payment.paymentMethod}</p>
                                        {this.state.isPaid === true ? <h6><b>Paid</b></h6> : <h6><b>Not Paid</b></h6>}
                                    </div>
                                </div>
                            </div>   
                            <br/>
                            <div className="card bg-light text-dark" style={{width: "94%", margin: "auto"}}>   
                                <div className="card-body">
                                    <h5 className="card-title"><b>Order Items</b></h5>
                                    {
                                        this.state.orderItems.map((item) => {
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
                                    <p className="card-text">Items: {this.state.subTotal}/- INR</p>
                                    <p className="card-text">Shipping: {this.state.shippingPrice === 100 ? this.state.shippingPrice +"/- INR" : "Free"}</p>                                
                                    <p className="card-text">Tax: {this.state.taxPrice}/- INR</p>
                                    <h5 style={{color: "crimson"}} className="card-title">Total: {this.state.totalPrice}/- INR</h5>
                                </div>
                                {
                                    !this.state.isPaid && < StripeCheckout className="w-50 payment-btn" stripeKey = "pk_test_OCOPweLlmHZpqnl1kjGF3SUt00JNA79g3l"
                                    token={this.handleToken} currency="INR" amount={this.state.totalPrice * 100} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}
OrderDetail.defaultProps = {
    orderDetails : {}
}
const mapStateToProps = state => {
    return {
        orderDetails: state.order.orderDetails
    }
}
export default connect(mapStateToProps, null)(OrderDetail);