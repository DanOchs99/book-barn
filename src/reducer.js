const initialState = {
    isAuthenticated: false,
    token: '',
    cartCount: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOGIN':
            return { ...state,
                     isAuthenticated: true,
                     token: action.token }
        case 'ON_LOGOUT':
            return { ...state,
                     isAuthenticated: false,
                     token: '' }
        case 'INCREMENT_CART':
            return { ...state,
                     cartCount: state.cartCount + 1 }
        default:
            return state
    }
}

export default reducer
