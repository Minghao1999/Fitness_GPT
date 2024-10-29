import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Styles/Login.css';
import { loginUser } from "../services/authServices.tsx";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const token = await loginUser(email, password);
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            localStorage.setItem('token', token);
            window.location.href = '/common';
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            console.log('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h1>Fitness GPT</h1>
                    <h2>Welcome Back!</h2>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>EMAIL OR USERNAME</label>
                        <input
                            type="email"
                            placeholder="Email or Username"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <input type="checkbox" /> Keep me logged in
                    </div>
                    <button type="submit" className="login-button">Login now</button>
                    <button
                        type="button"
                        className="register-button"
                        onClick={() => (window.location.href = '/register')}
                    >
                        Register a new account
                    </button>
                </form>
                <a href="#" className="forgot-password">Forgot your password?</a>
            </div>
        </div>
    );
};

export default Login;
