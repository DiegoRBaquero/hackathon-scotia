const blocked = require('blocked-at')
const axios = require('axios')
const rax = require('axios-retry')
const compression = require('compression')
const cors = require('cors')
const debug = require('debug')('backend:server')
const express = require('express')
const logger = require('morgan-debug')

const routeLoader = require('express-route-autoloader')

blocked((time, stack) => {
  debug(`Blocked for ${time}ms, operation started here: `, stack)
}, {threshold: 500})

const app = express()

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
app.set('x-powered-by', false)
app.use(compression())
app.use(cors({maxAge: 2592000}))
app.use(logger('backend:requests', 'START :method :url', {
  immediate: true,
  skip (req, res) {
    return req.path === '/health'
  }
}))
app.use(logger('backend:requests', 'DONE :method :url :status :res[content-length] - :response-time ms', {
  skip (req, res) {
    return req.originalUrl === '/health'
  }
}))
app.use(express.json({strict: false, type: '*/json', limit: 50 * 1024 * 1024}))

routeLoader(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  err.status = err.status || 500
  const betterDebug = err.debug ? err.debug : debug
  delete err.debug
  if (err.status < 500) delete err.stack
  betterDebug(err)

  const jsonToSend = {error: err.message}

  if (err.errors) jsonToSend.errors = err.errors.map(er => er.message || er)
  // if (req.app.get('env') === 'development') jsonToSend.stack = err.stack

  res.status(err.status)
  res.json(jsonToSend)
})

rax(axios, {
  retryDelay: (retryCount) => {
    return 1000 * 2 ** retryCount
  },
  retries: 10
})

module.exports = app
