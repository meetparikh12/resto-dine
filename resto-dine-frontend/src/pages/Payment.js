import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPaymentMethod } from '../actions/actions'
import Cookie from 'js-cookie';
import './Payment.css'
import Footer from '../components/Footer';

class Payment extends Component {
    constructor(props){
        super(props);
        this.state = {
            paymentMethod: ""
        }
        this.submitFormHandler = this.submitFormHandler.bind(this);
    }

    componentDidMount(){
        const cartItems = Cookie.getJSON("food-item");
        const {shippingDetails} = this.props;

        if(!(!!cartItems) || cartItems.length === 0){
            this.props.history.push('/cart');
        }
        else if(!shippingDetails.address){
            this.props.history.push('/shipping');
        }
    }
    submitFormHandler(e){
        e.preventDefault();
        const paymentMethod = {
            method: this.state.paymentMethod
        }
        this.props.addPaymentMethod(paymentMethod, this.props.history);
    }

    render() {
        return (
            <React.Fragment>
                <div className="payment mb-5">
                    <div className="payment_page mb-5">
                        <div className="bg-img">
                            <div className="overlay-bg"></div>
                            <div className="overlay-content">
                                <h2 className="primary_heading">Payment Info</h2>
                                <h3 className="secondary_heading">Method</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" style={{width: "18rem", margin: "2% auto"}}>
                                <div className="card-body">
                                <form onSubmit={this.submitFormHandler}>
                                    <h5 className="card-title" style={{marginBottom: "2rem"}}><b>Payment</b></h5>
                                    <div className="radio">
                                    <label><input required type="radio" name="paymentMethod" value="Stripe" onChange={(e)=>this.setState({paymentMethod: e.target.value})}/> Stripe</label>
                                    </div>  
                                    <input type="submit" value="Continue" className="btn text-uppercase text-white font-weight-lighter btn-block mt-4" style={{backgroundColor: "#C81912"}}/>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}
Payment.defaultProps = {
    shippingDetails: {}
}
const mapStateToProps = state => {
    return {
        shippingDetails: state.shipping.shippingAddress
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        addPaymentMethod: (method, history) => {
            dispatchEvent(addPaymentMethod(method));
            history.push('/place-order');
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment);