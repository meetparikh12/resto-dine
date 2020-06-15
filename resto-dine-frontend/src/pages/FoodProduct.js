import React, { useState, useEffect } from 'react'
import './FoodProduct.css'
import FoodItem from '../components/FoodItem'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import config from 'react-global-configuration'

export default function FoodProduct() {

    const [food_item, setFoodItem] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=> {
        axios.get(`${config.get('backend_url_products')}`)
        .then((res)=> {
            setFoodItem(res.data.products);
            setIsLoaded(true);
        })
        .catch((err)=> {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        })
    }, [])

    if(!isLoaded){
        return (
            <div className="text-center mb-5" style={{margin: "20% auto"}}>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <React.Fragment>
            <div className="food_product mb-5">
                <div className="bg-img">
                    <div className="overlay-bg"></div>
                    <div className="overlay-content">
                        <h2 className="primary_heading">Discover</h2>
                        <h3 className="secondary_heading">Our Food</h3>
                    </div>
                </div>
            </div>
            <div className="container mb-4">
                <div className="row">        
                    {food_item.map((food) => 
                        <FoodItem key={food._id}
                            id={food._id}
                            name={food.name}
                            image={food.image}
                            price={food.price}
                            quantityInStock = {food.quantityInStock}
                        />
                    )}
                </div>
            </div>
            
            <Footer/>
        </React.Fragment>
    )
}
