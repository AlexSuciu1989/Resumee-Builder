import React from "react";
import "./Contact.css";


function Contact () {
    return (
        <div className="Contact">
            <div className="contact-container">
                <p className="contact-title">Name</p>
                <p>Alexandru Suciu</p>
            </div>
            <div className="contact-container">
                <p className="contact-title">Mail</p>
                <p>v.alex.suciu@gmail.com</p>
            </div>
            <div className="contact-container">
                <p className="contact-title">Phone</p>
                <p>+40 741 062 732</p>
            </div>
        </div>
    )
}

export default Contact