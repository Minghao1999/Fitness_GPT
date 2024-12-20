import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Styles/Login.css';
import { loginUser } from "../Services/authServices.tsx";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const token = await loginUser(email, password);
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            localStorage.setItem('token', token);
            navigate('/dashboard')
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            console.log('Login error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

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
                        <label>EMAIL</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>PASSWORD</label>
                        <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type='button'
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
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
                <a href="/forgetpassword" className="forgot-password">Forgot your password?</a>
            </div>
        </div>
    );
};

export default Login;
