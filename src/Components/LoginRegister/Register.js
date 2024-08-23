import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import TermsAndConditions from "../Policy/TermsAndConditions";

function Register() {
    const [formData, setFormData] = useState({
        account: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [termsConditions, setTermsConditions] = useState(false);
    const [termsVisible, setTermsVisible] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Real-time password confirmation check
        if (name === "password" || name === "confirmPassword") {
            setPasswordMatch(value === formData.password || value === formData.confirmPassword);
        }
    };

    // Toggle visibility of Terms and Conditions
    const handleTermsVisibility = () => {
        setTermsVisible(!termsVisible);
    };

    // Handle checkbox for Terms and Conditions
    const handleTermsChange = () => {
        setTermsConditions(!termsConditions);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final check before submission
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");
        setSuccess("");

        try {
            const response = await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/register.php", formData);
            if (response.data.status === "success") {
                setSuccess("Account created successfully.");
                setFormData({
                    account: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                });
            } else {
                setError(response.data.message || "Registration failed.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="register-subcontainer">
                <div>
                    <label htmlFor="register-account">Username</label>
                    <input
                        type="text"
                        id="register-account"
                        name="account"
                        placeholder="Choose an account name"
                        value={formData.account}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="register-email">E-mail Address</label>
                    <input
                        type="email"
                        id="register-email"
                        name="email"
                        placeholder="Enter a valid email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="register-phone">Phone Number</label>
                    <input
                        type="text"
                        id="register-phone"
                        name="phone"
                        placeholder="Enter a valid phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="register-password">Password</label>
                    <input
                        type="password"
                        id="register-password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ borderColor: !passwordMatch ? "red" : "" }}  // Conditional styling
                    />
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{ borderColor: !passwordMatch ? "red" : "" }}  // Conditional styling
                    />
                </div>
                {!passwordMatch && formData.password && formData.confirmPassword && (
                    <p style={{ color: "red" }}>Passwords do not match.</p>
                )}
                <div>
                    <label style={{ color: !termsConditions ? "red" : "" }}>
                        <input
                            type="checkbox"
                            onChange={handleTermsChange}
                            style={{ marginRight: "5px" }}
                        />
                        I agree to the <button type="button" className="terms-button" onClick={handleTermsVisibility}>Terms and Conditions</button>
                    </label>
                </div>
                <div className="register-buttons">
                    <button
                        type="submit"
                        className="register-submit-button"
                        disabled={!passwordMatch || !termsConditions}
                    >
                        Create new account
                    </button>
                    <button
                        type="button"
                        className="register-cancel-button"
                        onClick={() => setFormData({ account: "", email: "", phone: "", password: "", confirmPassword: "" })}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className={`terms-container ${termsVisible ? "visible" : "hidden"}`}>
                <TermsAndConditions />
                <button onClick={handleTermsVisibility} className="terms-close-button">Close</button>
            </div>
        </div>
    );
}

export default Register;
