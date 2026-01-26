import React, { useState, useRef, useEffect } from "react";
import "./DisplayUsername.css";
import Logout from "./Logout";
import UserMenu from "../UserMenu/UserMenu";

function DisplayUsername({ username }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="DisplayUsername" ref={menuRef}>
      {username && (
        <>
          <span className="username">{username}</span>

          <button
            className="profile-btn"
            onClick={() => setOpenMenu((prev) => !prev)}
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
