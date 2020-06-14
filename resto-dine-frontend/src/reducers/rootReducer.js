import {combineReducers} from 'redux';
import { cartReducer } from './cartReducer';
import shippingReducer from './shippingReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
import foodCategoryReducer from './foodCategoryReducer';

export const rootReducer = combineReducers({
    cart : cartReducer,
    shipping: shippingReducer,
    order: orderReducer,
    user: userReducer,
    foodCategory: foodCategoryReducer
});