import React from 'react'
import './CartItem.css'
export default function CartItem(props) {
    return (
        <tr>
            <td><img src={props.image} className="cart-img-style" alt="Item img"></img></td>
            <td>{props.name}</td>
            <td className="text-center">{props.quantity}</td>
            <td className="text-center">{props.price}/-</td>
            <td className="text-center">{props.totalCost}/-</td>
            <td className="text-center"><i className="far fa-times-circle text-danger"></i></td>
        </tr>
    )
}
