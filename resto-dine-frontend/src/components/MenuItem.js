import React from 'react'
import './MenuItem.css'
export default function MenuItem(props) {
    return (
        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="menu_item">
                <div className="row">
                    <div className="col-3">
                        <img className="img-rounded rounded-circle ml-1" style={{"width": "5.5rem", "height": "5.5rem"}} src={`http://localhost:5000/${props.photo}`} alt="Menu item"/>
                    </div>
                    <div className="col-9">
                        <h4 className="font-weight-light mt-2">{props.name}</h4>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}
