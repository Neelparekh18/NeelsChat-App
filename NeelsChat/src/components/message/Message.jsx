import React from 'react';
import "./message.css";

const Message = ({ user, text, time }) => {
  return (
    <div className={`messageContainer ${user === 'me' ? 'sent' : 'received'}`}>
      <div className="messageBox">
        <p className="messageText">{text}</p>
      </div>
      <div className="messageInfo">
        <span className="messageUser">{user}</span>
        <span className="messageTime">{time}</span>
      </div>
    </div>
  );
};

export default Message;
