import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import ForgotPassword from "./ForgotPassword";

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://alexsuciu.ro/projects/jobrunner/php/login.php",
        formData,
      );

      if (response.data.status === "success") {
        setSuccess("Login successful.");
        onLoginSuccess(formData.account);
        window.location.reload();
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container-main">
      {!showForgot ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div>
                <label>Username</label>
                <input
                  type="text"
                  name="account"
                  className="login-account"
                  value={formData.account}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="login-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="LoginButton-container">
              <button type="submit" className="LoginButton">
                Login
              </button>
            </div>
          </form>

          <p className="forgot-link" onClick={() => setShowForgot(true)}>
            Forgot password?
          </p>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </>
      ) : (
        <>
          <ForgotPassword />
          <p className="back-to-login" onClick={() => setShowForgot(false)}>
            ← Back to login
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
