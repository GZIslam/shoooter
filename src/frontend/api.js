export const getRooms = () => {
    return fetch('/rooms').then(res => res.json()).catch(e => console.error(e));
};