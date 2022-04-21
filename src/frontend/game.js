// import { drawHud } from "./components/hud";
import { io } from "socket.io-client";
import { controller } from "./controller";
import { clearCanvas, drawArc, drawCircle } from "./drawer";

let currentLevel = 1;

let world = {};
let control = null;


const drawPlayer = ({ color, size, position, health, fullHealth }) => {
    drawCircle({ color, size, position });
    drawArc({ color: 'black', size, width: 2, position, value: health / fullHealth });
};

const drawBullet = ({ color, size, position }) => {
    drawCircle({ color, size, position })
};

const animatePlayer = () => {
    control?.animate();
}

const drawWorld = () => {
    clearCanvas();
    if(world.players) {
        world.players.forEach(player => drawPlayer(player));
    }
    if(world.bullets) {
        world.bullets.forEach(bullet => drawBullet(bullet));
    }
};

const tick = () => {
    // world.animate();
    // world.draw();
    animatePlayer();
    drawWorld();
    // if (world.players.length) drawHud(world.players[0], currentLevel);
    // if (world.isLevelFinished()) {
    //     currentLevel++;
    //     generateLevel(currentLevel);
    // }
    window.requestAnimationFrame(tick);
};

export const game = () => {
    const username = localStorage.getItem('username');
    const socket = io("ws://localhost:3000");
    socket.emit("world", localStorage.getItem("room"), username);
    socket.on("world", world_ => {
        world = world_;
        control = controller(world, world.players.find(p => p.name == username), socket);
        console.log(world);
    })
    tick();
};