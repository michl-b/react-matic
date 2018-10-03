const express = require('express')
const next = require('next')
const axios = require('axios')

const osramRoutes = require('./server/router/osram')
const openweathermapRoutes = require('./server/router/openweathermap')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT, 10) || 3000

require('dotenv').config()

app
  .prepare()
  .then(() => {
    const server = express()

    // Routing für die API
    server.get('/api/webcam/image', (req, res) => {
      res.type('jpeg')
      axios.get(process.env.WEBCAM_IMAGE_URL, {
        auth: { username: process.env.WEBCAM_USER, password: process.env.WEBCAM_PASS },
        responseType: 'arraybuffer'
      })
        .then(axiosRes => {
          res.send(axiosRes.data)
        })
        .catch((err) => {
          res.status(500).send(err)
          console.error(err)
        })
    })

    server.use('/', osramRoutes)
    server.use('/', openweathermapRoutes)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    // run Server
    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
