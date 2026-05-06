import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'socket.io';
import cors from 'cors';
import http from "http";
import connectToDatabase from './database/connect.js';

import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import router from "./route/auth.js";
import googleAuthRoutes from "./route/googleauth.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", router);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


app.use(express.static(path.join(path.resolve(), 'public')));
app.use("/auth", googleAuthRoutes);

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

// Database connection
connectToDatabase();

app.get('/', (req, res) => {

  // This is a code snippet for serving a static HTML file.
  // res.sendFile(path.join(path.resolve(), 'assets', 'index.html'));

  res.json({ message: "Welcome to the chat server!" });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
