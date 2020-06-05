import React from 'react'
import './Banner.css';

export default function Banner() {
    return (
        <div className="banner">
            <div className="bg-img">
                <div className="overlay-bg"></div>
                <div className="overlay-content">
                    <h5>Yummy and Delicious</h5>
                    <h1>Tasty</h1>
                    <button className="btn"> Discover menu </button>
                </div>
            </div>
        </div>
    )
}
