import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/api/auth/login', { email, password });
            alert(response.data.message);
            console.log('Token:', response.data.token);
        } catch (error: any) {
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className={styles['form-container']}>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;

             
