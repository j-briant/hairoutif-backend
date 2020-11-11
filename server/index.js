const Koa = require('koa')
const cors = require('kcors')
const log = require('./logger')
const api = require('./api')

// Setup Koa app
const app = new Koa()
const port = process.env.PORT || 5000

// Apply CORS config
const origin = process.env.CORS_ORIGIN | '*'
app.use(cors({ origin }))


// Log all requests
app.use(async (ctx, next) => {
  const start = Date.now()
  await next() // This will pause this function until the endpoint handler has resolved
  const responseTime = Date.now() - start
  log.info(`${ctx.method} ${ctx.status} ${ctx.url} - ${responseTime} ms`)
})

// Error Handler - All uncaught exceptions will percolate up to here
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    log.error(`Request Error ${ctx.url} - ${err.message}`)
  }
})

// Mount routes
app.use(api.middleware())

// Start the app
app.listen(port, () => {log.info(`Server listening at port ${port}`) })
