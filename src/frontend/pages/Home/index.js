import { App } from "../app";

export const Home = () => {
    const element = document.createElement("div");
    const headerText = document.createElement("h1");
    const nameInput = document.createElement("input");
    const applyButton = document.createElement("button");

    headerText.innerText = "Your name";
    applyButton.innerText = "Apply";
    element.append(headerText);
    element.append(nameInput);
    element.append(applyButton);

    applyButton.addEventListener("click", () => {
        if (nameInput.value) {
            localStorage.setItem("username", nameInput.value);
            App.setView("rooms");
        }
    })

    return element;
};