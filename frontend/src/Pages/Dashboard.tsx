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