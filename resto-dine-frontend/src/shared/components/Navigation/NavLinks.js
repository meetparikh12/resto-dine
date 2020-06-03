import React from 'react' ;
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

class NavLinks extends React.Component {

    render(){
        return (
        <ul className="nav-links">
    
            <li>
                <NavLink to="/" exact style={{textDecoration: "none"}}>HOME</NavLink>
            </li>

            <li>
                <NavLink to="/login" style={{textDecoration: "none"}} exact>FOOD ITEMS</NavLink>
            </li>
           
            <li>
                <NavLink to="/register" style={{textDecoration: "none"}}>MENU LIST</NavLink>
            </li>                     

        </ul>
        )
    }
}

export default NavLinks;