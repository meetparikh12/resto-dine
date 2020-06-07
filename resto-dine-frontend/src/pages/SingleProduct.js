import React from 'react'
import './SingleProduct.css'
import Footer from '../components/Footer';

export default function SingleProduct(props) {
    let quantityInStock = 6;
    let food_name, food_image, food_price;
    if(!(!!props.location.state)) {
        console.log(!!props.location.state);
        food_name = "";
        food_image = "";
        food_price = "";
    } else {
        const {name, image, price} = props.location.state;
        food_name= name;
        food_image = image;
        food_price = price;
    }
    return (
        <React.Fragment>
            <div className="single_product mb-5">
                <div className="bg-img">
                    <div className="overlay-bg"></div>
                    <div className="overlay-content">
                        <h2 className="primary_heading">{food_name}</h2>
                    </div>
                </div>
            </div>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-md-6">
                        <img className="img-fluid img-style" src={food_image} alt="Food post"/>
                    </div>
                    <div className="col-md-6">
                        <h3 className="title font-weight-bold">{food_name}</h3>
                        <h4 className="text-danger font-weight-bold">{food_price}/- INR</h4>
                        <div className="wrapper">
                                <div className="form-group">
                                    <label className="font-weight-bold">Quantity:</label>
                                        {quantityInStock > 0 ? <select className="form-control quantity-selector">
                                            {[...Array(quantityInStock).keys()].map((quantity)=> 
                                                <option key={quantity+1} value={quantity+1}>{quantity+1}</option>
                                            )}
                                        </select>: <span> 0</span>}
                                </div> 
                                <button className="btn btn-cart mb-3 text-uppercase font-weight-lighter" style={{color: "white"}}>Add To Cart</button>
                                <div className="font-weight-bold mb-4">Available</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
