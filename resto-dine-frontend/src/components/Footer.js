import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer">
        <br/>
        <br/>
            <div className="container text-white mt-4 mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div>
                        <h3 className="footer-font-change">LOCATIONS</h3>
                        <div className="row">
                            <div className="col-md-6">
                            <p className="footer-smallFont-change">1st Floor Shalini Road <br/> Vadodara Gujarat, 390007</p>
                            </div>
                            <div className="col-md-6">
                            <p className="footer-smallFont-change"> 2nd Floor Shalim Road <br/> Vadodara Gujarat, 390007</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className="footer-font-change">OPEN HOURS</h3>
                        <div className="row">
                            <div className="col-md-4">
                            <p className="footer-smallFont-change">Monday - Friday <br/> 10:00am - 10:00pm</p>
                            </div>
                            <div className="col-md-4">
                            <p className="footer-smallFont-change">Saturday - Sunday <br/> 12:00pm - 10:00pm</p>
                            </div>
                            <div className="col-md-4">
                            <p className="footer-smallFont-change">Available for Catering <br/> Email | Call Us</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <section className="footer-copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <p className="copyright-text">&copy; 2020 Resto Dine | All Rights Reserved.</p>
                        </div>
                        <div className="col-md-4 footer-icons">
                            <a href="/"><i className="fab icon fa-twitter"></i></a>
                            <a href="/"><i className="fab icon fa-facebook-f"></i></a>
                            <a href="/"><i className="fab icon fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
