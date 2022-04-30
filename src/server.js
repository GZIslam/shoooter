import express from "express";
import http from "http";
import { Server } from "socket.io";
import { generateWorld, updateWorld } from "./logic/world.js"; 
import path from "path";
import { createPlayer } from "./logic/player.js";
import { SessionWorker } from "./sessionWorker.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const sessionWorkers = {};

const rooms = {
    test: {}
};
const players = {};

app.use(express.static("public"));
app.use(cors());

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
            sessionWorkers[room] = SessionWorker(rooms[room]);
            sessionWorkers[room].addSession(name, socket);
            sessionWorkers[room].launch();
        }
        if(!rooms[room].players.some(i => i.name == name)){
            createPlayer(rooms[room], name);
            sessionWorkers[room].addSession(name, socket);
        }
        // socket.emit("world", rooms[room])
    });
    socket.on("action", (room, username, action, value) => {
        updateWorld(rooms[room], username, action, value);
        // socket.emit("world", rooms[room]);
    });
});

io.on("disonect", (socket) => {
    console.log("disconect", socket);
})

app.get("/rooms", (req, res) => {
    res.json(Object.keys(rooms));
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});