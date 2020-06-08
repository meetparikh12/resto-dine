import {createStore} from 'redux';
import {rootReducer} from '../reducers/rootReducer'
import Cookie from 'js-cookie'

const cartProduct = Cookie.getJSON("food-item") || [];
const initialState = {
    cart: {
        cartProduct
    }
}

export const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
