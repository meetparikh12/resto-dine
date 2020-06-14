import React from 'react'
import './FoodItem.css'
import { Link } from 'react-router-dom'
export default function FoodItem(props) {
    return (
        <div className="col-md-6 col-lg-4 product_item">
            <div className="card mb-4" style={{"width": "100%"}}>
                <div className="view overlay hm-black-light">
                    <Link to={`/food-item/${props.id}`}>
                        <img className="card-img-top food-img-hover" src={`http://localhost:5000/${props.image}`} style={{height: "14.5rem", borderBottom: "1px solid rgba(0,0,0,.1)"}} alt="Food-Post"/>
                        <div className="mask"></div>
                        <button className="btn">View</button>
                    </Link>
                </div>
                <div className="card-body">
                    <h5 className="text-center font-weight-light card-title">{props.name}</h5>
                    <p className="card-text font-weight-bold text-center text-danger">{props.price}/- INR</p>
                </div>
            </div>
        </div>
    )
}
