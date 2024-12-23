const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8282 });
const clients = new Set(); // Conjunto para almacenar clientes conectados

server.on('connection', (ws) => {
    console.log('Cliente conectado');
    clients.add(ws); // Añadir cliente al conjunto

    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        
        // Enviar el mensaje a todos los clientes conectados
        for (const client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message); // Enviar solo a los demás clientes
            }
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
        clients.delete(ws); // Eliminar cliente del conjunto
    });
});

console.log('Servidor WebSocket escuchando en ws://localhost:8282');
