import React, {useState, ChangeEvent, FormEvent} from 'react';
import './Styles/Login.css';
import {loginUser} from "../services/authServices.tsx";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<String>('')
    const [successMessage, setSuccessMessage] = useState<String>('')

    const handleLogin =async (e: FormEvent) => {
        e.preventDefault();
        try{
            const token = await loginUser(email, password)
            setSuccessMessage('Login successful!')
            setErrorMessage('')
            localStorage.setItem('token', token)
        }catch (error){
            setErrorMessage('Login failed. Please check your credentials.')
            console.log('Login error:', error)
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-page">
                <div className="login-left">
                    <h1>Welcome!</h1>
                    <div className="smiley-face">💪</div>
                </div>
                <div className="login-right">
                    <h2>Log in</h2>
                    {errorMessage && <p>{errorMessage}</p>}
                    {successMessage && <p>{successMessage}</p>}
                    <form onSubmit={handleLogin}>
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
                        <div className="form-group">
                            <input type="checkbox"/> Keep me logged in
                        </div>
                        <button type="submit" className="login-button">Login now</button>
                        <button className="register2-button" onClick={() => window.location.href = '/register'}>
                            Register a new account
                        </button>
                    </form>
                    <a href="#" className="forgot-password">Forgot your password?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;