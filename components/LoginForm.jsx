import React,  { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function LoginForm() {
    const [formData, setFormData] = React.useState({ username: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            localStorage.setItem('token', data.token)
            navigate('/posts')
        } catch (error) {
            console.error(error);
        }
    }

    const logOut = (e) => {
        e.preventDefault();

        try {
            localStorage.removeItem("token");
            navigate('/login')
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
        {!localStorage.token ? ( <form onSubmit={handleSubmit}>
        <input 
        type="username" 
        id='username'
        name='username'
        value={formData.username}
        onChange={e => setFormData({...formData, username: e.target.value})}
        placeholder='Username'
        />
        <input 
        type="password" 
        id='password'
        name='password'
        value={formData.password}
        onChange={e => setFormData({...formData, password: e.target.value})}
        placeholder='Password'
        />
        <button type='submit'>Log In</button>
        </form> ) : (        
            <button type='button' onClick={logOut} >Log Out</button>
        )}
        </>
    )
}