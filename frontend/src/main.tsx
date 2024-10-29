import React from 'react';
import ReactDOM from 'react-dom/client';
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";
import {SnackbarProvider} from "notistack";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.tsx";
import {Register} from "./Pages/Register.tsx";
import App from "./App.tsx";
import About from "./Pages/About.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import ForgetPassword from './Pages/Forgetpassword.tsx';
import AccountInfo from './Pages/AccountInfo.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <SnackbarProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App/>}>
                            <Route index element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/forgetpassword" element={<ForgetPassword/>}/>
                            <Route path="/accountinfo" element={<AccountInfo/>}/>
                        </Route>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>
)