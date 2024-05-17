import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 4500;
const server = http.createServer(app);
const users = [{}];
app.use(cors());

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`New Connection`);

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat, ${users[socket.id]}`,
    });
  });

  socket.on("message", ({ id, message }) => {
    io.emit("sendMessage", { user: users[id], message,id });
  });
  // socket.on("message",()=>{})
  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]} has left`,
    });
  });
});

app.get("/", (req, res) => {
  res.send("hello");
});
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
