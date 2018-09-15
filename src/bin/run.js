#!/usr/bin/env node

const app = require('../app')
const db = require('../db')
const debug = require('debug')('backend:starter')
const http = require('http')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4000')
app.set('port', port)

/**
 * This is the HTTP Server
 */
const server = http.createServer(app)

/**
 * Synchronize database and listen on provided port, on all network interfaces.
 */

Promise.all([
  db.sequelize.sync()
]).then(() => {
  server.on('error', onError)
  server.on('listening', onListening)
  server.on('close', onClose)
  server.listen(port)
}).catch(e => {
  console.error(e)
  server.listen(port)
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      setTimeout(() => process.exit(1))
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      setTimeout(() => process.exit(1))
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}

/**
 * Event listener for HTTP server "close" event.
 */

function onClose () {
  db.sequelize.close()
}

module.exports = server
