import * as actionTypes from '../actions/actionTypes'

const initialState = {
    cartProduct : []
}

export const cartReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:

            let product = [...state.cartProduct, action.payload];
            return {
                ...state,
                cartProduct: product
            }
    
        default:
            return {
                ...state
            }
    }
}