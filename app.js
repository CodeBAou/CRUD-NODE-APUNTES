require('dotenv').config();//Obtener fichero .env 
const Server = require('./models/server');

const server = new Server();

server.listen();