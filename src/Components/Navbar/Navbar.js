import React from "react";
import './Navbar.css';
import LogoImg from '../../Resources/Job-Runner-Logo.png'
import DisplayUsername from "../LoginRegister/DisplayUsername";
import Cookies from "js-cookie";

function Navbar() {
    return (
        <div className="Navbar">
            <div className="logo-container">
                <img className="LogoImg" src={LogoImg} alt="Job Runner Logo"/>
            </div>
            <div className="buy-coffee-container">
                <a href="https://www.buymeacoffee.com/Alex_Suciu" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Alex_Suciu&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy Me A Coffee"/>
                </a>
            </div>
            <div className="logout-container" style={Cookies.get("username") ? {} : { minWidth: "110px" }}>
                <DisplayUsername username={Cookies.get("username")} />
            </div>

        </div>
    )
}

export default Navbar