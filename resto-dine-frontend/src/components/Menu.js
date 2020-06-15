import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Specialities.css'
import MenuItem from './MenuItem'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Menu.css'
import config from 'react-global-configuration'
toast.configure();

export default function Menu() {
    const [menuItem, setMenuItem] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(()=> {
        axios.get(`${config.get('backend_url_category')}`)
        .then((res)=> {
            setMenuItem(res.data.categories);
            setIsLoaded(true);
        })
        .catch((err)=> {
            toast.error(err.response.data.message,{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        })
    }, [])

    if(!isLoaded){
        return <div className="text-center mb-5" style={{margin: "20% auto"}}>
                <h1>Loading...</h1>
            </div>
    }
    return (
        <div className="menu">
                <div className="bg-img-menu">
                    <div className="section-header menu_info text-white">
                        <span className="menu_title">Menu</span>
                        <div className="asset">
                            <span></span>
                            <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                            <span></span>
                        </div>
                        <p className="sub-title text-center"> Here is our Menu based on categories, we serve the best food in quality as well as quantity.</p>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="container">
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
    )
}
