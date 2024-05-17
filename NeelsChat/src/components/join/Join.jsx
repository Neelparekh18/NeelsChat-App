import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";
let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
};
const Join = () => {
  const [name, setName] = useState("");
  const handleClick = (e) => {
    if (!name) {
      e.preventDefault();
      alert("Please enter your name.");
    } else {
      sendUser();
    }
  };
  return (
    <>
      <div className="JoinPage">
        <div className="JoinContainer">
          <img src="/n-logo.png" alt="NeelsChat" />
          <h1>NeelsChat</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            type="text"
            id="joinInput"
          />
          <Link onClick={handleClick} to="/chat">
            <button id="joinBtn" onClick={sendUser}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Join;
export { user };
