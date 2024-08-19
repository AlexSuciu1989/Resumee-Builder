import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import './LoginRegister.css';
import DisplayUsername from "./DisplayUsername";
import Cookies from 'js-cookie';



function LoginRegister() {
    const [isVisibleLogin, setIsVisibleLogin] = useState(false);
    const [isVisibleRegister, setIsVisibleRegister] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [username, setUsername] = useState(""); 


    const handleClickLogin = () => {
        setIsVisibleLogin(true);
        setIsVisibleRegister(false);
    };

    const handleClickRegister = () => {
        setIsVisibleRegister(true);
        setIsVisibleLogin(false);
    };

    const handleLoginSuccess = (username) => {
        setLoginSuccess(true);
        setIsVisibleLogin(false);
        setIsVisibleRegister(false);
        setUsername(username);
        Cookies.set('username', username, { expires: 7 });
    };

    return (
        <div>
            {!loginSuccess && (
                <div className="loginRegister-button-container">
                    <button className="loginRegister-button" onClick={handleClickLogin}>
                        Login
                    </button>
                    <button className="loginRegister-button register-button" onClick={handleClickRegister}>
                        Register
                    </button>
                </div>
            )}
            <div className={`login-container ${isVisibleLogin ? 'visible' : 'hidden'}`}>
                <Login onLoginSuccess={handleLoginSuccess} />
            </div>
            <div className={`register-container ${isVisibleRegister ? 'visible' : 'hidden'}`}>
                <Register />
            </div>
            {loginSuccess && (
                <div className="username-info">
                    <DisplayUsername username={username} />
                </div>
            )}
        </div>
    );
}

export default LoginRegister;
