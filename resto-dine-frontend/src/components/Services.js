import React from 'react'
import './Specialities.css';
import ServiceInfo from './ServiceInfo';

const services = [{
    id: '1',
    image: "/img/assets/customer-service.png",
    title: 'Customer service',
    description: `We provide excellent service to our customers which includes greeting our diners the minute they walk in, 
    we listen intently and pay attention to what they want.`
}, {
    id: '2',
    image: "/img/assets/food-delivery.png",
    title: 'Food Delivery',
    description: `We provide food delivery service for customers on their door step if for any reason they're not willing 
    to come to the restaurant but want to enjoy home meal.`
}, {
    id: '3',
    image: "/img/assets/quality.png",
    title: 'Quality',
    description: `We provide the best food based on quality as well as quantity considering all the factors which includes
    the rate of hygiene, value for money and overall customer satisfaction.`
}]
export default function Services() {
    return (
        <div className="services">
        <br/>
            <div className="container">
                <div className="section-header">
                    <h2>We Provide</h2>
                    <div className="asset">
                        <span></span>
                        <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                        <span></span>
                    </div>
                </div>
                <br/>
                <div className="service_info mt-5">
                    <div className="row">
                        {services.map((service)=> {
                            return <ServiceInfo key={service.id}
                                    id={service.id}
                                    title={service.title}
                                    description={service.description}
                                    image={service.image}
                            />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
