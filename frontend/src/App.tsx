import React from 'react';
import Footer from "./components/common/Footer.tsx";
import HomeNavbar from "./Components/common/HomeNavbar.tsx";
import {Outlet} from "react-router-dom";

const App: React.FC = () => {
    return (
        <>
            <HomeNavbar/>
            <Outlet/>
            <Footer/>
        </>
    );
};

export default App;