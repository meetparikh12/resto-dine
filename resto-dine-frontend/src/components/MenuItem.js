import React from 'react'
import './MenuItem.css'
import { Link } from 'react-router-dom'
export default function MenuItem(props) {
    
    return (
        <div className="col-lg-6 col-md-6 col-sm-12">
            <Link to={`/foodCategory/${props.name}`} style={{textDecoration: "none"}}><div className="menu_item">
                <div className="row">
                    <div className="col-3">
                        <img className="img-rounded rounded-circle ml-1" style={{"width": "5.5rem", "height": "5.5rem"}} src={`http://localhost:5000/${props.photo}`} alt="Menu item"/>
                    </div>
                    <div className="col-9">
                        <h4 className="font-weight-light mt-2" style={{color: "#212529"}}>{props.name}</h4>
                    </div>
                </div>
            </div></Link>
            <br/>
        </div>
    )
}
