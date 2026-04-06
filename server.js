import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';
import http from "http";

const app = express();
dotenv.config();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


app.use(express.static(path.join(path.resolve(), 'public')));

// socket io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("send_message", (data) => {

    console.log("Message from user:", {...data, user_id: socket.id });

    io.emit("receive_message", {...data, user_id: socket.id });

  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'assets', 'chatboat.html'));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});