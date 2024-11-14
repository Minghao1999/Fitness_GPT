import React, {useState, useEffect} from 'react';
import './Styles/AccountInfo.css';
import {getUserInfo, updateUserInfo, uploadUserImage} from '../Services/authServices';
import {User} from '../Types/User';
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";

const AccountInfo: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
                setLoading(false);

                if (userInfo.imageId){
                    setProfileImage(`http://localhost:8080/auth/download-image/${userInfo.imageId}`)
                }
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try{
                const imageId = await uploadUserImage(file)
                setProfileImage(`http://localhost:8080/auth/download-image/${imageId}`)
                alert('Image uploaded successfully');
            }catch (error){
                console.error('Error uploading image:', error);
                setError('Failed to upload profile picture');
            }
        }
    }

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
                                <img src={profileImage || "/path/to/default-pic.jpg"} alt="Profile"/>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input"
                                />
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
