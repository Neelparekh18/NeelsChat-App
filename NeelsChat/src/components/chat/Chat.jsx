import React, { useEffect, useState } from "react";
import { user } from "../join/Join";
import socketIo from "socket.io-client";
import "./chat.css";
import Message from "../message/Message";

let socket;
const ENDPOINT = "http://localhost:4500/";
const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInp").value;
    socket.emit("message", { id, message });
    document.getElementById("chatInp").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages,data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages,data])
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages,data])
      console.log(data.user, data.message);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      if (socket) {
        socket.off("sendMessage");
      }
    };
  }, []);

  return (
    <>
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">NEELSCHAT</div>
          <div className="chatBox">
            {messages.map((msg, index) => (
              <Message
                key={index}
                user={msg.user === user ? 'me' : msg.user}
                text={msg.message}
                time={new Date().toLocaleTimeString()}
              />
            ))}
          </div>
          <div className="inpBox">
            <input type="text" id="chatInp" placeholder="Type a message..." />
            <button id="sendBtn" onClick={send}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
