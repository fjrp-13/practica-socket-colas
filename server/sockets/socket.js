const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguienteTicket = ticketControl.siguiente();
        //client.emit('siguienteTicket', siguienteTicket);
        callback(siguienteTicket);

    });

    client.emit('ticketActual', {
        actual: ticketControl.getUltimo(),
        lastTickets: ticketControl.getUltimos()
    });


    // Escuchar el cliente
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            callback({
                success: false,
                err: {
                    mensaje: "El escritorio es necesario"
                }
            });
        }

        let objResp = ticketControl.atenderTicket(data.escritorio);
        callback(objResp);
        if (objResp.success) {

        }
        // Actualizar/Notificar cambios en los Últimos Tickets
        client.broadcast.emit('lastTickets', {
            lastTickets: ticketControl.getUltimos()
        });

    });
});