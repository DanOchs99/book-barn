import * as actionTypes from '../types/user'

const initialState = {
    isAuthenticated: false,
    token: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_LOGIN:
            return { ...state,
                     isAuthenticated: true,
                     token: action.payload.token }
        case actionTypes.ON_LOGOUT:
            return { ...state,
                     isAuthenticated: false,
                     token: '' }
        default:
            return state
    }
}

export default userReducer
