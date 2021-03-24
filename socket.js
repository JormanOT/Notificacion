const socket = require('socket.io');

const Store = {};
const users = {};

module.exports = (server, Router) => {
    const _IO = socket(server);

    _IO.on('connection', (client) => {
        console.log(`Client Connected !`);

        client.on('conectar',(name)=>{
            users[name] = name;
            Store[name] = { notificacion : 0}
            client.name = name;
            client.canal = 'global'
            client.join('global');
            client.emit('conectado', 'Conexion establecida con exito !!');
            client.emit('updateUser',users, Store);
            client.broadcast.to('global').emit('updateUser',users, Store);
            console.log(users);
            console.log(Store);
        });

        Router.get('/user/:name', (req, res) => {
            const _ID = req.params.name;
            if (Store[_ID]) {
                Store[_ID].notificacion += 1;
            } else {
                Store[_ID] = {
                    notificacion: 1
                }
            }
            res.status(200).json(Store);
            client.emit('notificacion', Store, _ID);
            client.broadcast.to('global').emit('updateUser',users, Store);
        });

        client.on('disconnect', () => {
            console.log(`Client disconnect !`);
            delete users[client.name]
            client.broadcast.to('global').emit('updateUser',users, Store);
        });
    });
}