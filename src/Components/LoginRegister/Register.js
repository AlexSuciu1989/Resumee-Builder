import React, { useState } from "react";
import axios from "axios";

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

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
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
                    <label>E-mail Address</label>
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
                    <label>Phone Number</label>
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
                    <label>Password</label>
                    <input
                        type="password"
                        id="register-password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}

                    />
                </div>
                <div>
                    <button type="submit" className="LoginButton">Create new account</button>
                    <button type="button" className="LoginButton" onClick={() => setFormData({ account: "", email: "", phone: "", password: "", confirmPassword: "" })}>
                        Cancel
                    </button>
                </div>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}

export default Register;
