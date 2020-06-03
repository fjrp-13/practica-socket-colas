// Comando para establecer la conexión con el servidor
var socket = io();
const NUM_TICKETS_TO_SHOW = 4;


// Ticket Actual
socket.on('ticketActual', function(data) {
    let lastTickets = data.lastTickets;
    actualizarHTML(lastTickets, NUM_TICKETS_TO_SHOW);
});


socket.on('lastTickets', function(data) {
    let lastTickets = data.lastTickets;

    playAudio();
    //$('#btnAudio').click();

    actualizarHTML(lastTickets, NUM_TICKETS_TO_SHOW);
});


function playAudio() {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
};

function actualizarHTML(arrLastTickets, numTicketsToShow) {
    for (var i = 1; i <= numTicketsToShow; i++) {
        var $lblTicket = $('#lblTicket' + i).val('');
        var $lblEscritorio = $('#lblEscritorio' + i).val('');

        if (arrLastTickets.length >= i) {
            var ticket = arrLastTickets[i - 1];
            $lblTicket.text('Ticket ' + ticket.numero);
            $lblEscritorio.text('Escritorio ' + ticket.escritorio);
        }

    }

}