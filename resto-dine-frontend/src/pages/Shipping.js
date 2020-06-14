import React, { Component } from 'react'
import { addShippingDetails } from '../actions/actions';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import './Shipping.css'
import Footer from '../components/Footer';
class Shipping extends Component {
    constructor(props){
        super(props);
        this.state = {
            address: "",
            city: "",
            postalCode: "",
            country: ""
        }
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.submitFormHandler = this.submitFormHandler.bind(this);
    }

    componentDidMount(){
        const cartItems = Cookie.getJSON("food-item");
        if(!(!!cartItems) || cartItems.length === 0){
            this.props.history.push('/cart');
        } 
    }
    fieldChangeHandler(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submitFormHandler(e){
        e.preventDefault();
        const {address,city,postalCode, country} = this.state;
        const shippingDetails = {
            address,city,postalCode,country
        }
        this.props.addShippingDetails(shippingDetails, this.props.history);
    }
    render() {
        return (
            <React.Fragment>
                <div className="shipping mb-5">
                    <div className="shipping_page mb-5">
                        <div className="bg-img">
                            <div className="overlay-bg"></div>
                            <div className="overlay-content">
                                <h2 className="primary_heading">Delivery Address</h2>
                                <h3 className="secondary_heading">Your Details</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-md-8 m-auto" >
                            <form onSubmit={this.submitFormHandler}>
                                <div className="form-group">
                                    <input type="text" required onChange={this.fieldChangeHandler} className="form-control form-control-lg" name="address" 
                                    value={this.state.address} placeholder="Your address"/>
                                </div>
                                
                                <div className="form-group">
                                    <input type="text" required onChange={this.fieldChangeHandler} className="form-control form-control-lg"
                                    name="city" 
                                    value={this.state.city}  placeholder="Your city"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" required onChange={this.fieldChangeHandler} className="form-control form-control-lg"
                                    name="country" 
                                    value={this.state.country}  placeholder="Your country"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" required onChange={this.fieldChangeHandler} className="form-control form-control-lg"
                                    name="postalCode" 
                                    value={this.state.postalCode}  placeholder="Your postal-code"/>
                                </div>
                                
                                <input type="submit" value="Continue" className="btn text-white text-uppercase font-weight-lighter btn-block mt-4" style={{backgroundColor: "#C81912"}} />
                            </form>
                        </div>
                    </div>    
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        addShippingDetails: (shippingDetails, history) => {
            dispatchEvent(addShippingDetails(shippingDetails))
            history.push('/payment');
        }
    }
}

export default connect(null,mapDispatchToProps)(Shipping);