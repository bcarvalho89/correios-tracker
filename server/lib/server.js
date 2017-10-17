import app from '../app';
import http from 'http';
const debug = require('debug')('http');

import { normalizePort } from '../helpers/utils';
import configs from '../configs/config';

const port = normalizePort(process.env.PORT || configs.app_port);
const server = http.createServer(app);

app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  _setupLog();
}

function _setupLog() {
  console.log(configs.app_name);
  console.log(`Server started on http://${configs.app_host}:${configs.app_port}`);
  console.log(`Version: ${configs.app_version}`);
  console.log(`Allow to "${configs.app_origin}"`);
}