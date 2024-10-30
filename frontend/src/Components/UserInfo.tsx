import React, {useEffect, useState} from 'react';
import './/styles/UserInfo.css'
import {getUserInfo, updateUserInfo} from "../Services/authServices.tsx";
import {useNavigate} from "react-router-dom";

interface User {
    username: string
    email: string
    phone: string
    gender?: string
    age?: string
    height?: string
    weight?: string
}

const UserInfo: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [updatedUser, setUpdatedUser] = useState<Partial<User>>({})
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log('token', token)
        if (!token) {
            navigate('/login')
            return
        } else {
            const fetchUserInfo = async () => {
                try {
                    const userData = await getUserInfo()
                    setUser(userData)
                } catch (err) {
                    setError('Failed to fetch user info')
                    console.log(err)
                }
            }
            fetchUserInfo()
        }
    }, [navigate]);

    const handleEditToggle = () => {
        setEditMode(!editMode)
        setUpdatedUser(user || {})
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setUpdatedUser({...updatedUser, [name]: value})
    }

    const handleSave = async () => {
        try {
            const updatedData = await updateUserInfo(updatedUser)
            setUser(updatedData)
            setEditMode(false)
        } catch (err) {
            setError('Failed to update user info')
            console.log(error)
        }
    }

    if (error) {
        return <p>{error}</p>
    }

    if (!user) {
        return <p>Loading...</p>
    }

    return (
        <div className="user-info">
            <h2>User Information</h2>
            <p><strong>Username:</strong> {editMode ? <input name="username" value={updatedUser.username || ''}
                                                             onChange={handleInputChange}/> : user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {editMode ?
                <input name="phone" value={updatedUser.phone || ''} onChange={handleInputChange}/> : user.phone}</p>
            <p><strong>Gender:</strong> {editMode ?
                <input name="gender" value={updatedUser.gender || ''} onChange={handleInputChange}/> : user.gender}</p>
            <p><strong>Age:</strong> {editMode ?
                <input name="age" value={updatedUser.age || ''} onChange={handleInputChange}/> : user.age}</p>
            <p><strong>Height:</strong> {editMode ?
                <input name="height" value={updatedUser.height || ''} onChange={handleInputChange}/> : user.height}</p>
            <p><strong>Weight:</strong> {editMode ?
                <input name="weight" value={updatedUser.weight || ''} onChange={handleInputChange}/> : user.weight}</p>


            {editMode ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleEditToggle}>Edit</button>
            )}
        </div>
    );
};

export default UserInfo;
