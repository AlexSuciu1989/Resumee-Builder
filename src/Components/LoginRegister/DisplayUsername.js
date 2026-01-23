import React, { useState } from "react";
import "./DisplayUsername.css";
import Logout from "./Logout";
import UserMenu from "../UserMenu/UserMenu";

function DisplayUsername({ username }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="DisplayUsername">
      {username && (
        <>
          <span className="username">{username}</span>

          <button
            className="profile-btn"
            onClick={() => setOpenMenu(!openMenu)}
          >
            My Profile
          </button>

          <Logout />

          {openMenu && <UserMenu />}
        </>
      )}
    </div>
  );
}

export default DisplayUsername;
