import React from 'react'
import './CartItem.css'
import { connect } from 'react-redux'
import { removeFromCart } from '../actions/actions'
import { store } from '../store/store'
import Cookie from 'js-cookie'

function CartItem(props) {

    const removeItemHandler = (productId) => {
        props.removeItemFromCart(productId);
    }
    return (
        <tr>
            <td><img src={`http://localhost:5000/${props.image}`} className="cart-img-style" alt="Item img"></img></td>
            <td>{props.name}</td>
            <td className="text-center">{props.quantity}</td>
            <td className="text-center">{props.price}/-</td>
            <td className="text-center">{props.totalCost}/-</td>
            <td className="text-center"><i className="far fa-times-circle remove-item-icon text-danger" onClick={() => removeItemHandler(props.id)}></i></td>
        </tr>
    )
}
const mapDispatchToProps = dispatchEvent => {
    return {
        removeItemFromCart: (productId) => {
            dispatchEvent(removeFromCart(productId));
            const  { cart } = store.getState();
            Cookie.set("food-item", JSON.stringify(cart.cartProduct));
    
        }
    }
}
export default connect(null,mapDispatchToProps)(CartItem);