import express from "express";
import cors from "cors";

import { router } from "../routes/user.routes.js";
import { dbConnection } from "../database/config.db.js";

class Server {
  constructor() {
    this.expressApp = express();
    this.usersPath = "/api/users";
    this.PORT = process.env.PORT;

    //Conectar a DB
    this.dbConnect();

    //Middlewares
    this.middlewares();

    // rutas de la app
    this.routes();
  }

  async dbConnect () {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.expressApp.use(cors());

    //lectura y parseo del body
    this.expressApp.use(express.json());
    
    // Directorio publico
    this.expressApp.use(express.static("public"));
  }

  routes() {
    this.expressApp.use(this.usersPath, router);
  }

  listen() {
    this.expressApp.listen(this.PORT, () => {
      console.log(`Escuchando desde el puerto ${this.PORT}`);
    });
  }
}

export { Server };
