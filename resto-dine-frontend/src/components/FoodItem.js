import React from 'react'

export default function FoodItem(props) {
    return (
        <div className="col-md-6 col-lg-4 product_item">
            <div className="card mb-4" style={{"width": "100%"}}>
                <img className="card-img-top" src={props.image} style={{height: "14.5rem", borderBottom: "1px solid rgba(0,0,0,.1)"}} alt="Food-Post"/>
                <div className="card-body">
                    <h5 className="text-center display-5 card-title">{props.name}</h5>
                    <p className="card-text font-weight-bold text-center text-danger">{props.price}/- INR</p>
                </div>
            </div>
        </div>
    )
}
