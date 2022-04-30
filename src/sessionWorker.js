export const SessionWorker = (world) => {
    const sessions = {};
    let interval;

    const worker = {
        addSession: (name, socket) => {
            sessions[socket.client.conn.id] = {socket, name};
        },
        broadcast: (message) => {
            for(let key in sessions) {
                if(sessions[key].socket.disconnected){
                    // delete player
                    delete sessions[key];
                } else {
                    sessions[key].socket.emit("world", message);
                }
            }
        },
        launch: () => {
            interval = setInterval(() => {
                worker.broadcast(world);
            }, 33)
        }
    }

    return worker;
};