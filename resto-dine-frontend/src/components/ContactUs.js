import React, { Component } from 'react'
import './Specialities.css'
import './ContactUs.css'
export default class ContactUs extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            message: ""
        }
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    fieldChangeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    formSubmitHandler(e){
        e.preventDefault();
        alert('Your message has been sent, We will get back to you shortly.')
    }

    render(){
        return (
            <div className="contact_us">
                <div className="bg-img-contact-us">    
                    <div className="section-header text-white text-center contact_info">
                        <span className="contact_us_title">Contact Us</span>
                        <div className="asset">
                            <span></span>
                            <img src="/img/assets/about-us-icon.png" alt="Contact icon"/>
                            <span></span>
                        </div>
                        <p className="sub-title text-center">Contact Us regarding any queries or doubts. We'll try to get back within an hour.</p>
                    </div>
                </div>
                <div className="container mt-5 mb-5" style={{maxWidth: "575px"}}>
                    <form onSubmit={this.formSubmitHandler}>
                        <div className="form-group">
                            <label className="font-weight-light">Your Name</label>
                            <div className="form-field">
                            <input type="text" name="name" onChange={this.fieldChangeHandler} value={this.state.name} 
                            className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-light">Your Email</label>
                            <div className="form-field">
                            <input type="text" name="email" onChange={this.fieldChangeHandler} value={this.state.email} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-light">Your Message</label>
                            <div className="form-field">
                            <textarea name="message" cols="30" rows="6" onChange={this.fieldChangeHandler} value={this.state.message} 
                            className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Send Message" className="btn-style"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
