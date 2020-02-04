import React, { useState, useEffect } from 'react'
import './Login.css'
import { connect, useDispatch } from 'react-redux'
import * as actionCreators from '../store/actions/user'

const Login = (props) => {
    const [user, setUser] = useState({})
    const [status, setStatus] = useState([])

    const handleChange = (e) => {
        setUser ({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        const detailurl = `http://localhost:8080`
        if (user.name !== '') {
            fetch(detailurl, {
                method: 'POST',  
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => { 
                res.json()
                .then((json) => { 
                    if (res.status === 200) { 
                        sessionStorage.setItem('jwtToken', json);
                        props.onLogin(json)
                        props.history.push("/books")
                    }
                    else {
                        setStatus(json.message)
                        props.onLogout()
                    }
                });
            })
            .catch((error) => { console.log(error)
                                props.onLogout()
            });
        }
    }

    const dispatch  = useDispatch()

    useEffect(() => {
        sessionStorage.removeItem('jwtToken');
        dispatch({type: 'ON_LOGOUT'})
    }, [dispatch]);

    return (
        <div>
            <input key="username" type="text" onChange={handleChange} placeholder="username" name="username" />
            <input key="password" type="password" onChange={handleChange} placeholder="password" name="password" />
            <button key="login" onClick={handleClick} >Login</button>
            <label>{status}</label>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return { onLogin: (t) => dispatch(actionCreators.onLogin({token: t})),
            onLogout: () => dispatch(actionCreators.onLogout())
    }
}

export default connect(null, mapDispatchToProps)(Login)
