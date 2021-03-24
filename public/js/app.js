let Estatus = document.getElementById('status');
let Msg = document.getElementById('mensaje');
let Notificacion = document.getElementById('notificacion');

function conectar() {
    const socket = io();

    socket.emit('conectar', prompt('Indique su usuario'));

    socket.on('conectado', (data) => {
        let Estados = ['Connected', 'Disconnected'];
        Estatus.classList.remove('text-danger');
        Estatus.classList.add('text-success');
        Estatus.innerText = Estados[0];
        Msg.innerHTML = `<p class="alert alert-success">${data}</p>`
    });
    socket.on('notificacion', (store, Id) => {
        let user = document.getElementById(Id);
        user.innerHTML = store[Id].notificacion;
    });
    socket.on('updateUser', (users, store) => {
        Notificacion.innerHTML = '';
        for(let user in users){
            Notificacion.innerHTML += `<div class="Datos"> <p id="name">${user}</p><p id="${user}">${store[user].notificacion}</p></div>`
        }
    });
}  