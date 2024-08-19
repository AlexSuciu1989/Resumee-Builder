import React, { useState} from "react";
import axios from "axios";
import './Login.css';


function Login({ onLoginSuccess }) {

    const [formData, setFormData] = useState({
        account: "",
        password: "",
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
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("https://alex-suciu.homebuddy.ro/resumee-builder/php/login.php", formData);
            if (response.data.status === "success") {
                setSuccess("Login successfully.");
                setFormData({
                    account: "",
                    password: "",
                });
                onLoginSuccess(formData.account);
               
                window.location.reload();
            } else {
                setError(response.data.message || "Login failed.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container-main">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        id="login-account"
                        name="account"
                        placeholder="Choose an account name"
                        value={formData.account}
                        onChange={handleChange}
    
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
 
                <div className="LoginButton-container">
                    <button type="submit" className="LoginButton">Login</button>

                </div>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}

export default Login;
