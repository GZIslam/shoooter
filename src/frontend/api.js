export const getRooms = () => {
    return fetch('https://api.shooter.online/rooms').then(res => res.json()).catch(e => console.error(e));
};