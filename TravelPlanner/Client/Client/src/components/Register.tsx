import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.scss';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', {
                name,
                email,
                password,
            });
            alert(response.data.message);
        } catch (error: any) {
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        
        <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.formHeading}>Register</h2>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
        />
        <button type="submit" className={styles.submitBtn}>Register</button>
        <Link to="/login" className={styles.loginLink}>Login</Link>
    </form>
    
    );
};
export default Register;
