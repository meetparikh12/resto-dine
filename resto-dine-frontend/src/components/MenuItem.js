import React from 'react'
import './MenuItem.css'
export default function MenuItem(props) {
    return (
        <div className="col-lg-6 col-md-6 col-sm-12 menu_item">
            <div className="row">
                <div className="col-3">
                    <img className="img-responsive" style={{"width": "5.5rem", "height": "5.5rem"}} src={props.photo} alt="Menu item"/>
                </div>
                <div className="col-9">
                    <h6 className="ml-4 mt-2">{props.name}</h6>
                </div>
            </div>
            <br/>
        </div>
    )
}
