import React, { Component } from 'react'
import axios from 'axios'
import './FoodCategory.css'
import { toast } from 'react-toastify'
import FoodItem from '../components/FoodItem'
import Footer from '../components/Footer'
import config from 'react-global-configuration'

class FoodCategory extends Component {
    constructor(props){
        super(props);
        this.state ={
            foodCategory: {},
            isLoaded: false
        }
    }
    componentDidMount(){
        
        const {category} = this.props.match.params;
        axios.get(`${config.get('backend_url_category')}/` + category)
        .then((res)=> {
            this.setState({
                foodCategory: res.data.foodProducts,
                isLoaded: true
            })
        })
        .catch((err)=> {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
            this.props.history.push('/food-products')
        })
    }
    render() {
        if(!this.state.isLoaded){
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
                                <h3 className="secondary_heading">{this.state.foodCategory.categoryIdentifier}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="container mb-4">
                        <div className="row">        
                            {this.state.foodCategory.product.map((food) => 
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
}
export default FoodCategory;