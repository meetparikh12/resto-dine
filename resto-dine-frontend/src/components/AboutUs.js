import React from 'react'
import './AboutUs.css'
import './Specialities.css'
export default function AboutUs() {
    return (
        <div className="about_us">
            <div className="container">
                <div className="row ">
                    <div className="col-xl-7">
                        <div className="section-header">
                            <h2>About Us</h2>
                            <div className="asset">
                                <span></span>
                                <img src="/img/assets/about-us-icon.png" alt="About Us"/>
                                <span></span>
                            </div>
                        </div>
                        <div className="about-us-details font-weight-light mt-3">
                            <p>Resto Dine is a famous multi cuisine restaurant in Vadodara, was founded by a highly motivated groups of Chef Team. 
                            Resto Dine is a place to enjoy with friends, family and for couples also. Resto Dine provides a wonderful ambience,
                            we provide different food varieties, menu, service, taste and everything is just perfect over here. Resto Dine is a 
                            good place for continental food, it has value for money. We believe to maintain the high standard of hospitality service
                            and food for making your experience better than the expectation. Your words can boost and motivate us to deliver the high 
                            standard of service and high quality of food and improve where ever it is required. Please contact us if you 
                            have any questions.</p> 
                            <br/>
                        </div>
                    </div>
                    <div className="col-xl-5">
                        <div className="size2 bo-rad-10 hov-img-zoom m-l-r-auto">
                            <img className="img-fluid" src="/img/about-us/about_us.jpg" style={{height: "100%"}} alt="About Us"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
