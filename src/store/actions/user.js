import * as actionTypes from '../types/user'

export const onLogin = (payload) => {
    return { type: actionTypes.ON_LOGIN,
             payload: payload }
}

export const onLogout = () => {
    return { type: actionTypes.ON_LOGOUT }
}


