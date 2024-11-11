import React from 'react';
import Footer from "../components/common/Footer.tsx";
import {Outlet} from "react-router-dom";
import BoardNavbar from "../Components/common/BoardNavbar.tsx";
import MuscleMap from "../Data/MuscleMap";

const App: React.FC = () => {
    return (
        <>
            <BoardNavbar/>
            <Outlet/>
            <MuscleMap />
            <Footer/>
        </>
    );
};

export default App;