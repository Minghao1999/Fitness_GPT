import React, { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../Services/authServices.tsx';
import './Styles/Register.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('');
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword){
            setPasswordMatchError('Passwords do not match');
            return
        }
        setPasswordMatchError('')
        try {
            const data = await registerUser({
                username,
                email,
                password,
                phone
            });
            setMessage('Registration successful!');
            console.log('Registration user data:', data);
            // Redirect to /login after successful registration
            setTimeout(() => {
                window.location.href = '/login';
            }, 1000);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(`Registration failed: ${error.response.data.message}`);
            } else {
                setMessage('Registration failed. Try again');
            }
        }
        console.log('Username:', username, 'Email:', email, 'Phone:', phone, 'Password:', password);
    };

    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }

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
                            autoComplete="name"
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
                            autoComplete="phone"
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
                                onClick={handlePasswordVisibility}
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}
                    </div>
                    <div className="form-group">
                        <label>CONFIRM PASSWORD</label>
                        <div className="password-container">
                            <input
                                type={confirmPasswordVisible ? 'text' : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type='button'
                                className="toggle-password"
                                onClick={handleConfirmPasswordVisibility}
                            >
                                {confirmPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
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

export { Register };
