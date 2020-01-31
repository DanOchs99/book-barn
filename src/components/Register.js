import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import './Register.css';

const Register = (props) => {
    const [user, setUser] = useState({})

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
            .then((response) => { response.json()
                .then((json) => { sessionStorage.setItem('jwtToken', json);
                                  props.history.push("/books")
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
            <input key="username" type="text" onChange={handleChange} placeholder="username" name="name" />
            <input key="password" type="password" onChange={handleChange} placeholder="password" name="password" />
            <button key="login" onClick={handleClick} >Register</button>
        </div>
    );
}

export default Register