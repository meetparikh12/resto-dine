import React from 'react'
import CartItem from '../components/CartItem'
import Cookie from 'js-cookie'
import './CartPage.css'
export default function CartPage() {
    const food_item = Cookie.getJSON("food-item");

    return (
        <div className="cart">
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
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CartItem key={food_item.foodId}
                        name={food_item.name}
                        image = {food_item.image}
                        price = {food_item.price}
                        quantity = {food_item.quantity}
                    />
                    </tbody>
                </table>
            </div>
        </div>
    )
}
