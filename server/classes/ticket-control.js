const fs = require('fs');
const maxLastTickets = 4;

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate(); // Día
        this.tickets = []; // Array con los tickets pendientes
        this.lastTickets = [];

        // leer el fichero json con los datos
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.lastTickets = data.lastTickets;
        } else {
            this.reiniciarContador();
        }
    };

    reiniciarContador() {
        this.ultimo = 0;
        this.tickets = [];
        this.lastTickets = [];
        this.grabarArchivo();
    };

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null); // crear el ticket nuevo
        this.tickets.push(ticket); // Añadir el ticket al array de tickets
        this.grabarArchivo();


        return this.ultimo;
    }

    getUltimo() {
        return this.ultimo;
    }

    getUltimos() {
        return this.lastTickets;
    }

    atenderTicket(escritorio) {
        // Verificar que hay tickets pendientes
        if (this.tickets.length === 0) {
            return {
                success: false,
                error: {
                    message: "No hay tickets pendientes"
                }
            }
        }
        // Nº del primer ticket pendiente
        let numeroTicket = this.tickets[0].numero;

        // Eliminar el 1er ticket pendiente
        this.tickets.shift();
        // Crear el ticket que se va a atender ...
        let ticketAtendido = new Ticket(numeroTicket, escritorio);
        // ... y añadirlo como primer elemento del array con los últimos tickets
        this.lastTickets.unshift(ticketAtendido);
        if (this.lastTickets.length > maxLastTickets) {
            //this.lastTickets.splice(-1, 1); // borra el último ticket de los últimos tickets
            this.lastTickets.splice(-(this.lastTickets.length - maxLastTickets)); // Dejamos sólo los últimos "maxLAstTickets" tickets

        }
        this.grabarArchivo();
        return {
            success: true,
            ticket: ticketAtendido
        }
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            lastTickets: this.lastTickets
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString)
    }

}

module.exports = {
    TicketControl
}