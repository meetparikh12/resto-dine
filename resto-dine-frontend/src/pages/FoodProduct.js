import React from 'react'
import './FoodProduct.css'
import FoodItem from '../components/FoodItem'
import Footer from '../components/Footer'
const food_item = [{
    id: '1',
    photo: 'https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2013/04/paneer-butter-masala-paneer-makhani.jpg',
    name: 'Paneer Butter Masala',
    price: 350
}, {
    id: '2',
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
    photo: 'https://previews.123rf.com/images/indianfoodimages/indianfoodimages1901/indianfoodimages190101875/114795824-schezwan-paneer-fried-rice-with-szechuan-sauce-and-cottage-cheese-cubes-served-in-a-bowl-or-plate-or.jpg',
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
}, {
    id: '7',
    photo: 'https://ak.picdn.net/shutterstock/videos/1028612543/thumb/1.jpg',
    name: 'Manchurian',
    price: 140
}, {
    id: '8',
    photo: 'https://www.thestatesman.com/wp-content/uploads/2019/04/idli.jpg',
    name: 'Idli Sambhar',
    price: 100
}, {
    id: '9',
    photo: 'https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/ktbk2xyay12rzwuilhnx',
    name: 'Paneer Toofani', 
    price: 320
}, {
    id: '10',
    photo: 'https://files2.hungryforever.com/wp-content/uploads/2017/12/18111040/hamburger-1414422_960_720.jpg',
    name: 'Veg Aloo Tikki Burger with Fries',
    price: 160
}, {
    id: '11',
    photo: 'https://photo.foodgawker.com/wp-content/uploads/2017/02/2914184.jpg',
    name: 'Chocolate Caramel Freak Shake',
    price: 180
}, {
    id: '12',
    photo: 'https://gbc-cdn-public-media.azureedge.net/img72638.768x512.jpg',
    name: 'Penne Arrabbiata Pasta Red Sauce',
    price: 300
}]
export default function FoodProduct() {
    return (
        <React.Fragment>
            <div className="food_product mb-5">
                <div className="bg-img">
                    <div className="overlay-bg"></div>
                    <div className="overlay-content">
                        <h2 className="primary_heading">Discover</h2>
                        <h3 className="secondary_heading">Our Food</h3>
                    </div>
                </div>
            </div>
            <div className="container mb-4">
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
            <Footer/>
        </React.Fragment>
    )
}
