import {SET_FOOD_CATEGORY} from '../actions/actionTypes'

const intitialState = {
    foodCategory: ""
}
const foodCategoryReducer = (state=intitialState, action)=> {
    switch (action.type) {
        case SET_FOOD_CATEGORY:
            return {
                ...state,
                foodCategory: action.payload
            }
        default: 
            return {
                ...state
            }
    }
}

export default foodCategoryReducer