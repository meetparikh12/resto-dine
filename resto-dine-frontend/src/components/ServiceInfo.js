import React from 'react'
import './ServiceInfo.css'

export default function ServiceInfo(props) {
    return (
        <div className="col-md-4 col-sm-12">
            <div className="content_wrapper">
                <img className="avatar-icon" src={props.image} alt="Service Info"/>
                <h6 className="font-weight-bold text-uppercase">{props.title}</h6>
                <p>{props.description}</p>
            </div>
        </div>
    )
}
