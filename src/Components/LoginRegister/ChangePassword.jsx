import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

function ChangePassword({ account }) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            const response = await axios.post(
                "https://alexsuciu.ro/projects/jobrunner/php/change-password.php",
                {
                    account,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }
            );

            if (response.data.status === "success") {
                setSuccess("Password changed successfully.");
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            } else {
                setError(response.data.message || "Password change failed.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Change Password</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}

export default ChangePassword;
