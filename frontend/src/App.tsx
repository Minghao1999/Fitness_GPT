import React from 'react';
import Footer from "./components/common/Footer.tsx";
import Navbar from "./Components/common/Navbar.tsx";
import {Outlet} from "react-router-dom";

const App: React.FC = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
            
        </>
    );
};

export default App;