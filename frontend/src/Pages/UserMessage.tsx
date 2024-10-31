import React from 'react';
import './Styles/Dashboard.css'
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import Footer from "../Components/common/Footer.tsx";

const UserMessage: React.FC = () => {
    return (
        <div className="user-info">
            <BoardNavbar/>
            <h2>Chat with Fitness GPT</h2>
            <Footer/>
        </div>
    );
};

export default UserMessage;
