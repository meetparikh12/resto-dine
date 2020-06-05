import React from 'react'
import './Specialities.css'
import './ContactUs.css'
export default function ContactUs() {
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
            <div className="container mt-5" style={{maxWidth: "575px"}}>
                <form>
                    <div className="form-group">
                        <label for="c_name" className="font-weight-light">Your Name</label>
                        <div className="form-field">
                        <input type="text" id="c_name" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="c_email" className="font-weight-light">Your Email</label>
                        <div className="form-field">
                        <input type="text" id="c_email" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="c_message" className="font-weight-light">Your Message</label>
                        <div className="form-field">
                        <textarea name="c_message" id="c_message" cols="30" rows="6" className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Book Table" className="btn-style"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
