import express from 'express';
import socketIO from 'socket.io';
import { SERVER_PORT } from '../globals/enviroment';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

  private static _intance: Server;

  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor( ) {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server( this.app );
    this.io = new socketIO.Server( this.httpServer, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
        credentials: true
      }
    } );

    this.escuchaSockets();
  }
  // singleton
  public static get instance(){
    return this._intance || ( this._intance = new this() );
  }

  private escuchaSockets(){
    
    this.io.on('connection', cliente =>{
      console.log('conexion OK!! ', cliente.id);

      // conectar Cliente
      socket.conectarCliente( cliente );
      
      // Configurar usuario
      socket.configurarUsuario( cliente, this.io );

      // Mensajes
      socket.mensaje( cliente, this.io );      

      // desconectar
      socket.desconectar( cliente );
    })
  }

  start( callback: any) {
    this.httpServer.listen( this.port, callback );
  }
}