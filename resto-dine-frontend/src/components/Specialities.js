import React, { useEffect, useState } from 'react'
import './Specialities.css'
import FoodItem from './FoodItem'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Specialities() {

    const [specialFoodItems, setSpecialFoodItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=> {
        axios.get("http://localhost:5000/api/product/speciality/food")
        .then((res)=> {
            setSpecialFoodItems(res.data.products);
            setIsLoaded(true);
        })
        .catch((err)=> {
            toast.error(err.response.data.message,{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        })
    }, [])

    if(!isLoaded){
        return <div className="text-center mb-5" style={{margin: "20% auto"}}>
                <h1>Loading...</h1>
            </div>
    }
    return (
        <div className="specialities">
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="section-header">
                    <h2>Specialities</h2>
                    <div className="asset">
                        <span></span>
                        <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                        <span></span>
                    </div>
                    <p className="sub-title"> Have a look at our specialities which are also our best seller, you may like it. </p>
                </div>
                <br/>
                <div className="specialities_item mb-5">
                    <div className="row">        
                        {specialFoodItems.map((food) => 
                            <FoodItem key={food._id}
                                id={food._id}
                                name={food.name}
                                image={food.image}
                                price={food.price}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
