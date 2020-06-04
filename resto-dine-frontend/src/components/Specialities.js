import React from 'react'
import './Specialities.css'
import FoodItem from './FoodItem'

const food_item = [{
    id: '1',
    photo: 'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2013/04/paneer-butter-masala-paneer-makhani.jpg',
    name: 'Paneer Butter Masala',
    price: 350
}, {
    id:'2',
    photo: 'https://www.theculinarypeace.com/wp-content/uploads/2019/08/eZy-Watermark-26-08-2019-02-12-25PM.jpg',
    name: 'Mysore Masala Dosa',
    price: 210
}, {
    id: '3',
    photo: 'https://www.eatwell.co.nz/images/recipes/24062015VIVAMargaritaPizza.jpg?width=603&height=339&mode=crop&upscale=false',
    name: 'Cheese Pizza',
    price: 280
}, {
    id: '4',
    photo: 'https://i0.wp.com/mytastycurry.com/wp-content/uploads/2017/02/fried-rice-.jpg?resize=600%2C891&ssl=1',
    name: 'Schezwan Fried Rice',
    price: 300
}, {
    id: '5',
    photo: 'https://c4.wallpaperflare.com/wallpaper/1007/855/649/buffalo-chicken-enchiladas-land-wallpaper-preview.jpg',
    name: 'Enchiladas', 
    price: 320
}, {
    id: '6',
    photo: 'https://i1.wp.com/s3.ap-south-1.amazonaws.com/images.salonyscookbook.com/pav-bhaji-recipe/pav-bhaji-recipe13.jpg?w=1200',
    name: 'Pav Bhaji',
    price: 120
}]
export default function Specialities() {
    return (
        <div className="specialities">
            <br/>
            <br/>
            <br/>
            <div className="container">
                <div className="section-header">
                    <h2>Specialities</h2>
                    <div className="asset">
                        <span></span>
                        <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                        <span></span>
                    </div>
                    <p className="sub-title"> Have a look at our specialities which are also our best seller, you may like it. </p>
                </div>
                <br/>
                <div className="specialities_item mb-5">
                    <div className="row">        
                        {food_item.map((food) => 
                            <FoodItem key={food.id}
                                id={food.id}
                                name={food.name}
                                image={food.photo}
                                price={food.price}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
