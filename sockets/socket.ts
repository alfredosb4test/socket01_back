import { Socket } from 'socket.io';
import socketIO  from 'socket.io';
import { UsuariosLista } from '../clases/usuario-lista';
import { Usuario } from '../clases/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket )=>{
  const usuario = new Usuario( cliente.id );
  usuariosConectados.agregar( usuario );
}

export const desconectar = ( cliente: Socket )=>{
  cliente.on('disconnect', () => {
    console.log('cliente desconectado id->', cliente.id );
    const usrEliminado = usuariosConectados.borrarUsuario( cliente.id );
    console.log( 'usuario eliminado::', usrEliminado );
  });
}
// escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', ( payload: {
      de: string,
      cuerpo: string
    } ) =>{

    console.log('mensaje recibido', payload );

    io.emit( 'mensaje-nuevo', payload );
    
  });
}

// nuevo login
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
  cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function) => {
    console.log('nombre ', payload);

    usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
 
    callback({
      ok: true,
      mensaje: `Usuario ${ payload.nombre}, configurado`
    })
  });
}