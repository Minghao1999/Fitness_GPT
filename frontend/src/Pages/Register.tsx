import React, { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../Services/authServices.tsx';
import './Styles/Register.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = await registerUser({
                username,
                email,
                password,
                phone
            });
            setMessage('Registration successful!');
            console.log('Registration user data:', data);
        } catch (error) {
            setMessage('Registration failed. Try again');
        }
        console.log('Username:', username, 'Email:', email, 'Phone:', phone, 'Password:', password);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-header">
                    <h1>Fitness GPT</h1>
                    <h2>Join Us Today!</h2>
                </div>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleRegister} className="register-form">
                    <div className="form-group">
                        <label>USERNAME</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>EMAIL</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>PHONE</label>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
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
                    <button type="submit" className="register-button">Register now</button>
                </form>
                <button
                    type="button"
                    className="back-login-button"
                    onClick={() => (window.location.href = '/login')}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};


export {Register};
