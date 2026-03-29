import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔐 repeat password validation
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://alexsuciu.ro/projects/jobrunner/php/reset-password.php",
        { token, password }
      );

      if (res.data.status === "success") {
        setMessage("Password updated successfully. Redirecting to login...");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h3>Reset Password</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Repeat new password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {message && (
        <>
          <p style={{ color: "green" }}>{message}</p>
          <p className="go-home" onClick={() => navigate("/")}>
            Go to login
          </p>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ResetPassword;
