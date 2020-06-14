import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Specialities.css'
import MenuItem from './MenuItem'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Menu.css'
toast.configure();
// const menu_item = [{
//     id: '1',
//     photo: 'https://besthqwallpapers.com/img/original/12597/pizza-italian-food-italian-pizza-pizza-with-sausage.jpg',
//     name: 'Italian'
// }, {
//     id: '2',
//     photo: 'https://yourboulder.com/wp-content/uploads/2019/05/best-mexican-restaurants-in-boulder.png',
//     name: 'Mexican'
// }, {
//     id: '3',
//     photo: 'https://myrealket.com/upload/restaurant@myrealket.com/punjabi-dishes.jpg',
//     name: 'Punjabi'
// }, {
//     id: '4',
//     photo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
//     name: 'Burger'
// }, {
//     id: '5',
//     photo: 'https://previews.123rf.com/images/indianfoodimages/indianfoodimages1901/indianfoodimages190101875/114795824-schezwan-paneer-fried-rice-with-szechuan-sauce-and-cottage-cheese-cubes-served-in-a-bowl-or-plate-or.jpg',
//     name: 'Chinese'
// }, {
//     id: '6',
//     photo: 'https://b.zmtcdn.com/data/pictures/chains/0/19193850/00078c3a5782b1367a6cdfcc03f710a9.jpg',
//     name: 'South Indian'
// }]
export default function Menu() {
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
