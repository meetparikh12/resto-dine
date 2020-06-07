import React from 'react'
import './Banner.css';
import { Link } from 'react-router-dom';

export default function Banner() {
    return (
        <div className="banner">
            <div className="bg-img">
                <div className="overlay-bg"></div>
                <div className="overlay-content">
                    <h5>Yummy and Delicious</h5>
                    <h1>Tasty</h1>
                    <Link to="/menu"><button className="btn" style={{cursor: "pointer"}}> Discover menu </button></Link>
                </div>
            </div>
        </div>
    )
}
