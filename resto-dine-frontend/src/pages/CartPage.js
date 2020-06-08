import React from 'react'
import CartItem from '../components/CartItem'
import Cookie from 'js-cookie'
import './CartPage.css'
import Footer from '../components/Footer';
export default function CartPage() {

    const food_item = Cookie.getJSON("food-item") || [];
    
    return (
        <React.Fragment>
            <div className="cart mb-5">
                <div className="cart_products_banner mb-5">
                    <div className="bg-img">
                        <div className="overlay-bg"></div>
                        <div className="overlay-content">
                            <h2 className="primary_heading">Food Cart</h2>
                            <h3 className="secondary_heading">Your Items</h3>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <table className="table table-striped table-res">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Name</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {food_item.map((product => {
                                return <CartItem key={product.foodId}
                                name={product.name}
                                image = {product.image}
                                price = {product.price}
                                quantity = {product.quantity}
                                totalCost = {product.totalCost}
                                />
                                }))
                            }
                        
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
