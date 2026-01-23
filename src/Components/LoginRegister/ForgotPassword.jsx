import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://alexsuciu.ro/projects/jobrunner/php/forgot-password.php",
        { email }
      );

      if (res.data.status === "success") {
        setMessage(res.data.message);
        setEmail("");
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h3>Forgot Password</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Recover Password</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ForgotPassword;
