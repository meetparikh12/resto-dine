import React from 'react'
import './AboutUs.css'
import './Specialities.css'
export default function AboutUs() {
    return (
        <div className="about_us">
            <div className="container">
                <div className="row ">
                    <div className="col-md-7">
                        <div className="section-header">
                            <h2>About Us</h2>
                            <div className="asset">
                                <span></span>
                                <img src="/img/assets/about-us-icon.png" alt="About Us"/>
                                <span></span>
                            </div>
                        </div>
                        <div className="about-us-details font-weight-light mt-3">
                            <p>Pietech Solution is a global information technology, consulting and outsourcing company 
                            was founded by a highly motivated groups of marketing Team software Developer. Pietech is not 
                            a typical outsourcing company.Talented, driven and principled people  who are passionate 
                            about IT services, came together because they wanted to do something special. Special work 
                            for our clients is the front line, revolutionizing the way the industry works is a  gradual 
                            effect, improving Industry through services is our long term goal.Please contact us if you 
                            have any questions.</p> 
                            <br/>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="size2 bo-rad-10 hov-img-zoom m-l-r-auto">
                            <img className="img-fluid" src="/img/about-us/about_us.jpg" style={{height: "100%"}} alt="About Us"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
