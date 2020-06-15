import React from 'react'
import './Banner.css';

export default function Banner() {
    return (
        <div className="banner">
            <div className="bg-img">
                <div className="overlay-bg"></div>
                <div className="overlay-content">
                    <h2 className="primary_heading">Yummy and Delicious</h2>
                    <h3 className="secondary_heading">Tasty</h3>
                </div>
            </div>
        </div>
    )
}
