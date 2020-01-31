import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import './Login.css';

const Login = (props) => {
    const [user, setUser] = useState({})
    const [status, setStatus] = useState('')

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
                        props.history.push("/books")
                    }
                    else {
                        setStatus(json.message)
                    }
                });
            })
            .catch((error) => console.log(error));
        }
    }

    useEffect(() => {
        sessionStorage.removeItem('jwtToken');
    }, []);

    return (
        <div>
            <input key="username" type="text" onChange={handleChange} placeholder="username" name="username" />
            <input key="password" type="password" onChange={handleChange} placeholder="password" name="password" />
            <button key="login" onClick={handleClick} >Login</button>
            <label>{status}</label>
        </div>
    );
}

export default Login
