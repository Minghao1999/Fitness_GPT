import React, {useState, useEffect} from 'react';
import './Styles/AccountInfo.css';
import {getUserInfo, updateUserInfo} from '../Services/authServices';
import {User} from '../Types/User';
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";

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
        const {name, value} = e.target;
        if (user) {
            setUser({...user, [name]: value});
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
        <div>
            <BoardNavbar/>
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
                                <img src="/path/to/profile-pic.jpg" alt="Profile"/>
                            </div>
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
                                type="phone"
                                name="phone"
                                value={user?.phone || ''}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>GENDER</label>
                            <input
                                type="gender"
                                name="gender"
                                value={user?.gender || ''}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>AGE</label>
                            <input
                                type="age"
                                name="age"
                                value={user?.age || ''}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>HEIGHT</label>
                            <input
                                type="heigt"
                                name="height"
                                value={user?.height || ''}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>WEIGHT</label>
                            <input
                                type="weight"
                                name="weight"
                                value={user?.weight || ''}
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
            <Footer/>
        </div>
    );
};

export default AccountInfo;
