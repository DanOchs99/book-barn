import * as actionTypes from '../types/cart'

const initialState = {
    cartCount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT_CART:
            return { ...state,
                     cartCount: state.cartCount + 1 }
        default:
            return state
    }
}

export default cartReducer
