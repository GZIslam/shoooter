export const getRooms = () => {
    const host = import.meta.env.MODE === "dev" ? "http://127.0.0.1:3000" : "https://api.shoooter.online";
    return fetch(`${host}/rooms`).then(res => res.json()).catch(e => console.error(e));
};