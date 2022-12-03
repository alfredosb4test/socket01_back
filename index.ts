import Server from "./clases/server";
import { router } from "./routes/router";
import bodyParser from "body-parser"; 
import cors from 'cors';
//var cors = require('cors')

const server = Server.instance;

server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// Cors
// server.app.use( cors({ 
//   origin:true,
//   credentials: true, 
// }));
server.app.use(cors());

server.app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:4200 https://www.differentServerDomain.fr");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



server.app.use('/', router);

server.start( ()=>{
  console.log(`Server port ${ server.port }`);
  
})
