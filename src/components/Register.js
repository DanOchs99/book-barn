import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import './Register.css'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'

const Register = (props) => {
    const [user, setUser] = useState({})
    const [status, setStatus] = useState('')

    const handleChange = (e) => {
        setUser ({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        const detailurl = `http://localhost:8080/register`
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
            <button key="login" onClick={handleClick} >Register</button>
            <label>{status}</label>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return { onLogin: (t) => dispatch({type: 'ON_LOGIN', token: t}),
            onLogout: () => dispatch({type: 'ON_LOGOUT'})
    }
}

export default connect(null, mapDispatchToProps)(Register)