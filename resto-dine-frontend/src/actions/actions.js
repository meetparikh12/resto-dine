import * as actionTypes from "./actionTypes";

export const addToCart = (product) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: product
    }
}

export const removeFromCart = (productId) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: productId
    }
}

export const addShippingDetails = (shippingDetails) => {
    return {
        type: actionTypes.ADD_SHIPPING_DETAILS,
        payload: shippingDetails
    }
}

export const addPaymentMethod = (paymentMethod) => {
    return {
        type: actionTypes.ADD_PAYMENT_METHOD,
        payload: paymentMethod
    }
}

export const addOrderDetails = (orderDetails) => {
    return {
        type: actionTypes.ORDER_DETAILS,
        payload: orderDetails
    }
}

export const setUserInfo = (userInfo) => {
    return {
        type: actionTypes.SET_USER_INFO,
        payload: userInfo
    }
}

export const setFoodCategory = (foodCategory)=> {
    return {
        type: actionTypes.SET_FOOD_CATEGORY,
        payload: foodCategory
    }
}
