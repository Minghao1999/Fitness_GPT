import React, { useState, useEffect } from 'react';
import './Styles/AccountInfo.css';
import { getUserInfo, updateUserInfo } from '../Services/authServices';
import { User } from '../Types/User';

const AccountInfo: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching user info:', err);
                setError('Failed to load user information');
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (user) {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSaveChanges = async () => {
        if (user) {
            try {
                setLoading(true);
                const updatedUser = await updateUserInfo(user);
                setUser(updatedUser);
                setLoading(false);
                alert('User information updated successfully');
            } catch (err) {
                console.error('Error updating user info:', err);
                setError('Failed to update user information');
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="account-info-container">
            <div className="account-info-box">
                <div className="account-info-header">
                    <h1>Fitness GPT</h1>
                    <h2>Account Information</h2>
                </div>
                <form className="account-info-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>PROFILE PICTURE</label>
                        <div className="profile-picture">
                            <img src="/path/to/profile-pic.jpg" alt="Profile" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>NAME</label>
                        <input
                            type="text"
                            name="name"
                            value={user?.name || ''}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>USERNAME</label>
                        <input
                            type="text"
                            name="username"
                            value={user?.username || ''}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            value={user?.email || ''}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>PHONE</label>
                        <input
                            type="tel"
                            name="phone"
                            value={user?.phone || ''}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>BIRTHDAY</label>
                        <input
                            type="date"
                            name="birthday"
                            value={user?.birthday || ''}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={user?.password || ''}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <button type="button" onClick={handleSaveChanges} className="save-button">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccountInfo;
