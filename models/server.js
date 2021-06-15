const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use( express.json());

        //directorio publico
        this.app.use( express.static('public'));

    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){        
        this.app.listen(this.port);
    }

}

module.exports = Server;