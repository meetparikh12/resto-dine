import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './FoodCategory.css'
import { toast } from 'react-toastify'
import FoodItem from '../components/FoodItem'
import Footer from '../components/Footer'

function FoodCategory(props) {
    const [foodCategory, setFoodCategory] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=> {
        const category = props.match.params.category;
        axios.get('http://localhost:5000/api/category/' +category)
        .then((res)=> {
            setFoodCategory(res.data.foodProducts)
            setIsLoaded(true)
        })
        .catch((err)=> {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
            props.history.push('/food-products')
        })
    }, [props.match.params.category])

    if(!isLoaded){
        return <div className="text-center mb-5" style={{margin: "20% auto"}}>
                <h1>Loading...</h1>
            </div>
    }
    return (
        <React.Fragment>
            <div className="food_category">
                <div className="food_category_banner mb-5">
                    <div className="bg-img">
                        <div className="overlay-bg"></div>
                        <div className="overlay-content">
                            <h2 className="primary_heading">Food Category</h2>
                            <h3 className="secondary_heading">{foodCategory.categoryIdentifier}</h3>
                        </div>
                    </div>
                </div>
                <div className="container mb-4">
                    <div className="row">        
                        {foodCategory.product.map((food) => 
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
            </div>
            <Footer/>
        </React.Fragment>

    )
}
export default FoodCategory;