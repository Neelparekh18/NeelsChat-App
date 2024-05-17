import { useState } from "react";
import socketIo from "socket.io-client";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";


function App() {
  const [count, setCount] = useState(0);

  // socket.on("connect", () => {
  //   console.log("connected!");
  // });
  return (
    <>
      <Routes>
        <Route path="/" element={<Join/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </>
  );
}

export default App;
