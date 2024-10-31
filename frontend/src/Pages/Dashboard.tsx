// import React, {useState} from "react";
// import UserInfo from "../Components/UserInfo.tsx";
// import './Styles/Dashboard.css'
// import UserMessage from "../Components/UserMessage.tsx";
// import sidebarIcon from "../assets/images/sidebar.svg"
// import UserExercises from "../Components/UserExercises.tsx";
// import UserFavorites from "../Components/UserFavorites.tsx";
//
// const Dashboard: React.FC = () =>{
//     const [activeTab, setActiveTab] = useState<string>('UserInfo')
//     const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
//
//     const handleTabChange = (tab: string) => {
//         if(tab === 'Quit'){
//             localStorage.removeItem('token')
//             window.location.href = '/'
//         }else {
//             setActiveTab(tab)
//         }
//     }
//
//     const toggleSidebar = () =>{
//         setIsSidebarOpen(!isSidebarOpen)
//     }
//
//     const renderContent = () =>{
//         switch (activeTab){
//             case 'UserInfo':
//                 return <UserInfo/>
//             case 'Chat':
//                 return <UserMessage/>
//             case 'Exercises':
//                 return <UserExercises/>
//             case 'Favorites':
//                 return <UserFavorites/>
//             default:
//                 return <UserInfo/>
//         }
//     }
//     return(
//         <div className="dashboard-container">
//                 <button
//                     onClick={toggleSidebar}
//                     className= {`toggle-button ${isSidebarOpen ? '' : 'collapsed'}`}
//                 >
//                     <img src={sidebarIcon} alt="Toggle Sidebar" className="sidebar-icon" />
//                 </button>
//             <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
//                 {isSidebarOpen && (
//                     <>
//                 <h2>Fitness GPT</h2>
//                         <ul>
//                             <li onClick={() => handleTabChange('UserInfo')}>Info</li>
//                             <li onClick={() => handleTabChange('Chat')}>Chat</li>
//                             <li onClick={() => handleTabChange('Exercises')}>Exercises</li>
//                             <li onClick={() => handleTabChange('Favorites')}>Favorites</li>
//                             <li onClick={() => handleTabChange('Quit')} className="quit">Quit</li>
//                         </ul>
//                     </>
//                 )}
//             </div>
//             <div className="content">
//                 {renderContent()}
//             </div>
//         </div>
//     )
// }
//
// export default Dashboard

import React from 'react';
import Footer from "../components/common/Footer.tsx";
import {Outlet} from "react-router-dom";
import BoardNavbar from "../Components/common/BoardNavbar.tsx";

const App: React.FC = () => {
    return (
        <>
            <BoardNavbar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default App;