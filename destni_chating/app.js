const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const socket = require("socket.io");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
  secret: "ChatV2", 
  resave: false, 
  saveUninitialized: true 
}));

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const io = socket(server);

io.on("connection", (socket) => {
  console.log(socket.id + " a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
});

app.get("/chat", (req, res) => {
  res.render("chat.ejs", { name: "harshitsharma" });
});

// 404 handler should be defined after all routes
app.use(function (req, res) {
  res.status(404).end("404 NOT FOUND");
});
