const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    
    constructor(){

        this.app          = express();
        this.port         = process.env.PORT;//Variable de entorno puerto conexion
        this.usuariosPath = '/api/usuarios';//path api

        //Conectar a Mongo
        this.conectarDB();
        //Midlewares
        this.middlewares();
        //Rutas de mi aplicacion+
        this.routes();
    }

    //Funcion llamada a conexion Mongodb
    async conectarDB(){
        await dbConnection();
    }

    /**
     * Configuracion Middlewar
     *  Un middleware es un software que permite que las aplicaciones de un sistema 
     *  se comuniquen entre sí y, también, con otros paquetes de software, con el sistema 
     *  operativo y con elementos hardware.
     *      - cors
     *      - formato json
     *      - pagina statica
     */
    middlewares(){
        
        //CORS
        this.app.use( cors() ); //cors cabeceras http ( paquete cors npm )
        
        //Lectura y parseo del body
        this.app.use( express.json() );
        
        //Directorio Publico
        this.app.use( express.static( 'public' ) );

    }

    routes(){
      //path a partir del cual funcionara la api
      this.app.use( this.usuariosPath, require('../routes/usuarios') ); //ruta
    }

  
    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
}

module.exports = Server;