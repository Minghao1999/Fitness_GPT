import React from 'react';
import Navbar from "./components/common/Navbar.tsx";
import Footer from "./components/common/Footer.tsx";

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