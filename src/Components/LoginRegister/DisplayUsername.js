import React from "react";
import './DisplayUsername.css';
import Logout from "./Logout";


function DisplayUsername ({username}) {
    return (
        <div className="DisplayUsername">
            <p>{username} {username ? <span><Logout/></span> : null}</p>
        </div>
    )
}

export default DisplayUsername