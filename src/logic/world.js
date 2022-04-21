// const { generateLevel } = require("./levels");
import { generateLevel } from "./levels.js";

export const updateWorld = (room, user, action) => {

};

export const generateWorld = () => {
    const world = {
        players: [],
        bullets: [],
        level: 1,
        mapSize: {w: 1920, h: 1080}
    };
    generateLevel(world.level, world);
    return world;
};

// export default { generateWorld, updateWorld }
// module.exports = {generateWorld, updateWorld}