import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Styles/AccountInfo.css';

const AccountInfo: React.FC = () => {
    const [name, setName] = useState<string>('John Doe');
    const [username, setUsername] = useState<string>('john_doe');
    const [email, setEmail] = useState<string>('john.doe@example.com');
    const [phone, setPhone] = useState<string>('123-456-7890');
    const [birthday, setBirthday] = useState<string>('1990-01-01');
    const [password, setPassword] = useState<string>('********');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'birthday':
                setBirthday(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="account-info-container">
            <div className="account-info-box">
                <div className="account-info-header">
                    <h1>Fitness GPT</h1>
                    <h2>Account Information</h2>
                </div>
                <form className="account-info-form">
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
                            value={name}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>USERNAME</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>PHONE</label>
                        <input
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>BIRTHDAY</label>
                        <input
                            type="date"
                            name="birthday"
                            value={birthday}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountInfo;
