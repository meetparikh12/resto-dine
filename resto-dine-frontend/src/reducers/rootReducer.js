import {combineReducers} from 'redux';
import { cartReducer } from './cartReducer';
import shippingReducer from './shippingReducer';

export const rootReducer = combineReducers({
    cart : cartReducer,
    shipping: shippingReducer
});