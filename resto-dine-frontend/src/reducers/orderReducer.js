import {ORDER_DETAILS} from '../actions/actionTypes'
const initialState = {
    orderDetails : {}
}

const orderReducer = (state=initialState, action) => {
    switch (action.type) {
        case ORDER_DETAILS:
            
            return {
                ...state,
                orderDetails: action.payload
            }
    
        default:
            return {
                ...state
            };
    }
}

export default orderReducer;