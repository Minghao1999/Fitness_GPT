import React from 'react';
import Navbar from "./Components/common/Navbar.tsx";
import Footer from "./Components/common/Footer.tsx";
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