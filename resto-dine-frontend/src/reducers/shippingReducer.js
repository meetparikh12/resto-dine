import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shippingAddress: {},
    paymentMethod: {}
}
const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SHIPPING_DETAILS:
            return {
                ...state,
                shippingAddress: action.payload
            }
            case actionTypes.ADD_PAYMENT_METHOD:
                return {
                    ...state,
                    paymentMethod: action.payload
                }
                default:
                    return {
                        ...state
                    }
    }
}

export default shippingReducer;