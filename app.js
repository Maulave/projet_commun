const express = require('express');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT 
const annonces = require('./routes/annonces');
const inscription = require('./routes/inscription');
const connexion = require('./routes/connexion');
const reconnexion = require('./routes/reconnexion');
const message = require('./routes/message');


const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/inscription', inscription);
app.use('/annonces', annonces);
app.use('/connexion', connexion);
app.use('/reconnexion', reconnexion);
app.use('/message', message);




///////////////////////////////////////
/* -------------------------------------------------------------------------- */
/*                              WEB SOKECT SERVER                             */
/* -------------------------------------------------------------------------- */
//////////////////////////////////////


const webSocketsServerPort = 8000;
const webSokectServer = require('websocket').server;
const http = require('http');

// http server et websocket server.
const server = http.createServer()
server.listen(webSocketsServerPort);
console.log('listening on port 8000')

const wsServer = new webSokectServer({
    httpServer: server
})

const clients = {};


// genere une ID unique pour tous les utilisateurs
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    var userID = getUniqueID()
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

    // 
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ', message.utf8Data);

            //
            for (var key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent Message to: ', clients[key])
            }
        }
    })
})

app.listen(port, () => {
    console.log(`serveur lancé sur le port : ${port}`)
})


