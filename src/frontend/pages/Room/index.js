import { game } from "../../game";
import { initialize } from "../../drawer";

export const setupRoom = () => {
    initialize();
    game();
};

export const Room = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";

    return canvas;
};