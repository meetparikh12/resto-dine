import React from 'react'
import './Specialities.css'
import MenuItem from './MenuItem'

const menu_item = [{
    id: '1',
    photo: 'https://besthqwallpapers.com/img/original/12597/pizza-italian-food-italian-pizza-pizza-with-sausage.jpg',
    name: 'Italian'
}, {
    id: '2',
    photo: 'https://yourboulder.com/wp-content/uploads/2019/05/best-mexican-restaurants-in-boulder.png',
    name: 'Mexican'
}, {
    id: '3',
    photo: 'https://myrealket.com/upload/restaurant@myrealket.com/punjabi-dishes.jpg',
    name: 'Punjabi'
}, {
    id: '4',
    photo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
    name: 'Burger'
}, {
    id: '5',
    photo: 'https://previews.123rf.com/images/indianfoodimages/indianfoodimages1901/indianfoodimages190101875/114795824-schezwan-paneer-fried-rice-with-szechuan-sauce-and-cottage-cheese-cubes-served-in-a-bowl-or-plate-or.jpg',
    name: 'Chinese'
}, {
    id: '6',
    photo: 'https://b.zmtcdn.com/data/pictures/chains/0/19193850/00078c3a5782b1367a6cdfcc03f710a9.jpg',
    name: 'South Indian'
}]
export default function Menu() {
    return (
        <div className="menu mb-5">
            <br/>
            <div className="container">
                <div className="section-header">
                    <h2>Menu</h2>
                    <div className="asset">
                        <span></span>
                        <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                        <span></span>
                    </div>
                    <p className="sub-title"> Here is our Menu based on categories, we serve the best food in quality as well as quantity.</p>
                </div>
                <br/>
                <div className="menu_items">
                    <div className="row">
                        {menu_item.map((menu)=> {
                           return <MenuItem key={menu.id} 
                               id = {menu.id}
                               name = {menu.name}
                               photo = {menu.photo}
                           />                            
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
