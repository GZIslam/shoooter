import { getRooms } from "../../api";
import { App } from "../app";
import { setupRoom } from "../Room";

export const Rooms = () => {
    const element = document.createElement("div");

    const headerText = document.createElement("h1");
    headerText.innerText = "Rooms";

    element.append(headerText);

    getRooms().then(res => {
        res.forEach(room => {
            const roomElement = document.createElement("p");
            roomElement.addEventListener("click", () => {
                localStorage.setItem("room", room);
                App.setView("room");
                setupRoom();
            });
            roomElement.innerText = room;
            element.append(roomElement);
        })
    })

    return element;
};