import React, { useState, useEffect } from 'react'
import './MenuPage.css'
import '../components/Specialities.css'
import MenuItem from '../components/MenuItem'
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

export default function MenuPage() {
    const [menuItem, setMenuItem] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:5000/api/category")
        .then((res)=> {
            setMenuItem(res.data.categories);
        })
        .catch((err)=> {
            toast.error(err.response.data.message,{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        })
    }, [])

    return (
        <React.Fragment>
            <div className="menu_page mb-5">
                <div className="menu_list_banner">
                    <div className="bg-img">
                        <div className="overlay-bg"></div>
                        <div className="overlay-content">
                            <h2 className="primary_heading">Menu Page</h2>
                            <h3 className="secondary_heading">Our Menu</h3>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="menu_items">
                        <div className="row">
                            {menuItem.map((menu)=> {
                            return <MenuItem key={menu._id} 
                                id = {menu._id}
                                name = {menu.categoryIdentifier}
                                photo = {menu.menuImage}
                            />                            
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
