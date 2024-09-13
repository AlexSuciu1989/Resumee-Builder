import React, {useState} from "react";
import "./Footer.css";
import TermsAndConditions from "../Policy/TermsAndConditions";
import Contact from "../Contact/Contact";

function Footer () {

    const [termsVisibility, setTermsVisibility] = useState("footer-hidden");
    const [contactVisibility, setContactVisibility] = useState("footer-hidden");

    const handleTermsVisibility = () => {
        setTermsVisibility(termsVisibility === "footer-hidden" ? "visible" : "footer-hidden");
        setContactVisibility("footer-hidden")
    };

    const handleContactVisibility = ()  => {
        setContactVisibility(contactVisibility === "footer-hidden" ? "visible" : "footer-hidden");
        setTermsVisibility("footer-hidden")
    }

    return (
        <div className="Footer">
            <div>
                <p><a href="https://alex-suciu.homebuddy.ro/" target="_blank" rel="noopener noreferrer">About Me</a></p>
                <p onClick={handleContactVisibility}>Contact</p>
                <p onClick={handleTermsVisibility}>Terms, Conditions and Cookies policy</p>

            </div>
            <div className={`footer-terms-container ${termsVisibility}`}>
                    <TermsAndConditions/>
                    <button onClick={handleTermsVisibility} className="footer-terms-close-button">Close</button>
                </div>
            <div className={`contact-container ${contactVisibility}`}>
                <Contact/>
            </div>
        </div>
    )
}

export default Footer