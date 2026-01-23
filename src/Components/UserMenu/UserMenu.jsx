import "./UserMenu.css";
import React, { useState } from "react";
import Cookies from "js-cookie";
import ChangePassword from "../LoginRegister/ChangePassword";

function UserMenu() {
  const username = Cookies.get("username");
  const email = Cookies.get("email");

  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="user-menu">
      <h3>My Profile</h3>

      <div className="menu-row">
        <span className="label">Username</span>
        <span className="value">{username}</span>
      </div>

      {email && (
        <div className="menu-row">
          <span className="label">Email</span>
          <span className="value">{email}</span>
        </div>
      )}

      <button
        className="menu-action"
        onClick={() => setShowChangePassword(!showChangePassword)}
      >
        Change Password
      </button>

      {showChangePassword && (
        <ChangePassword account={username} />
      )}
    </div>
  );
}

export default UserMenu;
