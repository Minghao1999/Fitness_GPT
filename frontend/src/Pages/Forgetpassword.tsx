import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Styles/ForgetPassword.css';

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleForgetPassword = async (e: FormEvent) => {
        e.preventDefault();
        try {
            // Simulate sending reset link
            setSuccessMessage('Password reset link has been sent to your email.');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to send reset link. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="forget-password-container">
            <div className="forget-password-box">
                <div className="forget-password-header">
                    <h1>Fitness GPT</h1>
                    <h2>Forgot Your Password?</h2>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleForgetPassword} className="forget-password-form">
                    <div className="form-group">
                        <label>EMAIL</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="form-button">Send Reset Link</button>
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

export default ForgetPassword;
