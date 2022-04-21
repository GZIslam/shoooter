import "./style.sass";
import { Home } from "./frontend/pages/Home";
import { App } from "./frontend/pages/app";
import { Rooms } from "./frontend/pages/Rooms";
import { Room } from "./frontend/pages/Room";

App.addView(Home(), "home");
App.addView(Rooms(), "rooms");
App.addView(Room(), "room");

App.setView("home");

document.body.append(App.element);