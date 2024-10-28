import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginbottom from './components/common/Login-bottom';
import Login from './Pages/Login';
import { Register } from './Pages/Register';
import './App.css';

const App: React.FC = () => {
    return (
        <Router>
        <div className="app-container">
            <Loginbottom />
            <div className="auth-page">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </div>
        </Router>
    );
};

export default App;