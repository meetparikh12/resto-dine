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
    
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartProduct: state.cartProduct.filter((product) => product.foodId !== action.payload)
            }

        case actionTypes.CLEAR_CART:
            return {
                cartProduct: action.payload
            }
            
        default:
            return {
                ...state
            }
    }
}