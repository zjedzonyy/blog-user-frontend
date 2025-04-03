import React,  { useState } from 'react';



export default function SignupForm() {
    const [formData, setFormData] = React.useState({ username: '', password: ''});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
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
        <button type='submit'>Register</button>
        </form>
    )
}