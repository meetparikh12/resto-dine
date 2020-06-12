import React, { Component } from 'react'
import { addShippingDetails } from '../../actions/actions';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';

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
        const cartItems = Cookie.getJSON("cartItems");
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
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto" >
                        <h4 className="display-4 text-center" style={{marginTop: "2%"}}>Shipping Details</h4>
                        <br/>
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
                            
                            <input type="submit" value="Continue" className="btn btn-warning btn-block mt-4" />
                        </form>
                    </div>
                </div>    
            </div>
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