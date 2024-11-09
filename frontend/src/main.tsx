import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.ts";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.tsx";
import { Register } from "./Pages/Register.tsx";
import App from "./App.tsx";
import About from "./Pages/About.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import ForgetPassword from './Pages/Forgetpassword.tsx';
import AccountInfo from './Pages/AccountInfo.tsx';
import UserMessage from "./Pages/UserMessage.tsx";
import UserExercises from "./Pages/UserExercises.tsx";
import UserFavorites from "./Pages/UserFavorites.tsx";
import PrivateRoute from './Components/common/PrivateRoute.tsx';
import UserExerciseDetail from "./Pages/UserExerciseDetail.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgetpassword" element={<ForgetPassword />} />
                        </Route>
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/user-message"
                            element={
                                <PrivateRoute>
                                    <UserMessage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/user-exercise"
                            element={
                                <PrivateRoute>
                                    <UserExercises />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/user-favorites"
                            element={
                                <PrivateRoute>
                                    <UserFavorites />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/accountinfo"
                            element={
                            <PrivateRoute>
                                <AccountInfo />
                            </PrivateRoute>
                            }
                        />
                        <Route
                            path="/exercise-detail/:id"
                            element={
                                <PrivateRoute>
                                    <UserExerciseDetail />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </SnackbarProvider>
        </ThemeProvider>
    </React.StrictMode>
);