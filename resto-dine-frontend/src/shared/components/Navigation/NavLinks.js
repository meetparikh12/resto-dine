import React from 'react' ;
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import setJwtToken from '../../securityUtils/setJwtToken';
import { setUserInfo } from '../../../actions/actions';
import { connect } from 'react-redux';
import { ADD_SHIPPING_DETAILS, ADD_PAYMENT_METHOD } from '../../../actions/actionTypes';
import { store } from '../../../store/store';

function NavLinks(props) {

     const logoutUser = () => {
        store.dispatch({
            type: ADD_SHIPPING_DETAILS,
            payload: {}
        })
        store.dispatch({
            type: ADD_PAYMENT_METHOD,
            payload: {}
        })
        props.logoutUser();
    }
    const {loggedInUser} = props;
    return (
        <ul className="nav-links">

            <li>
                <NavLink to="/" exact style={{textDecoration: "none"}}>HOME</NavLink>
            </li>

            <li>
                <NavLink to="/food-products" style={{textDecoration: "none"}} exact>FOOD ITEMS</NavLink>
            </li>
            
            <li>
                <NavLink to="/menu-list" style={{textDecoration: "none"}}>MENU LIST</NavLink>
            </li>    

            <li>
                <NavLink to="/cart" style={{textDecoration: "none"}}>MY CART</NavLink>
            </li>     

            { !loggedInUser.userId && <li>
                <NavLink to="/login" style={{textDecoration: "none"}}>LOGIN</NavLink>
            </li>}                

            { loggedInUser.userId && <li>
                <NavLink to="/orders" style={{textDecoration: "none"}}>MY ORDERS</NavLink>
            </li>} 
                
            { loggedInUser.userId && <li>
                <NavLink to="/login" onClick={logoutUser} style={{textDecoration: "none"}}>LOGOUT</NavLink>
            </li>}

                 

        </ul>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.userInfo
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        logoutUser: () => {
            localStorage.removeItem("jwt-token");
            setJwtToken(false);
            dispatchEvent(setUserInfo({}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavLinks);