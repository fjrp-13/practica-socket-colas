// Comando para establecer la conexión con el servidor
var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = "index.html";
    throw new Error("Es escritorio es necesario.");
}

var escritorio = searchParams.get('escritorio');
$('#numeroEscritorio').text(escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        var numTicket = '';
        if (resp.success === true) {
            var ticket = resp.ticket;
            numTicket = ticket.numero;
        } else {
            numTicket = "No hay tickets pendientes"
        }
        $('#numeroTicket').text(numTicket)
    })

});

/* 
var $labelNextText = $('#lblNuevoTicket')

// Conectamos el socket con el servidor (Nuestro código del frontEnd, estará pendiente de cualquier cosa que pase en el Backend)
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// Control de pérdida de conexión/desconexión con el servidor
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// Ticket Actual
socket.on('ticketActual', function(resp) {
    $labelNextText.text(resp.actual || '');
});


$('button').on('click', function() {
    // Comunicación entre Cliente (FrontEnd) y Servidor (Backend): Enviar información
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        $labelNextText.text(siguienteTicket);
    });

})

// // Comunicación entre Cliente (FrontEnd) y Servidor (Backend): Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fran',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('Respuesta del server:', resp);
// });
// // Comunicación entre Cliente (FrontEnd) y Servidor (Backend): Escuchar información
// socket.on('enviarMensaje', function(mensaje) {
//     console.log(mensaje);
// }); */