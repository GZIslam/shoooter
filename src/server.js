// const express = require("express");
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { generateWorld } from "./logic/world.js"; 
import path from "path";
import { createPlayer } from "./logic/player.js";

const app = express();
// const http = require("http");
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const path = require("path");
// const { generateWorld } = require("./logic/world");
const io = new Server(server);

const rooms = {
    test: {}
};
const players = {};

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.dirname(__dirname) + "/public/index.html");
});

io.on("connection", (socket) => {
    console.log("a user connected");
    // socket.emit("world", 1, "2", { 3: Buffer.from([4]) });

    // receive a message from the client
    socket.on("world", (room, name) => {
        if(!rooms[room].players) {
            rooms[room] = generateWorld();
            // rooms[room].players.push(createPlayer(rooms[room], name))
        }
        if(!rooms[room].players.some(i => i.name == name))
            createPlayer(rooms[room], name);
        socket.emit("world", rooms[room])
    });
    socket.on("action", (room, user, action) => {
        updateWorld(rooms[room], user, action);
        socket.emit("world", rooms[room])
    });
});

app.get("/rooms", (req, res) => {
    res.json(Object.keys(rooms));
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});