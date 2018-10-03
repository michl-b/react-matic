const routes = require('express').Router()
const lightify = require('node-lightify')

routes.get('/api/osram/discover', (req, res) => {
  var lightifyConnection = new lightify.lightify(process.env.OSRAM_GATEWAY_BASE_IP)
  lightifyConnection.connect().then(function () {
    return lightifyConnection.discover()
  }).then(function (data) {
    lightifyConnection.dispose()
    res.send(data.result)
  }).catch(function (error) {
    lightifyConnection.dispose()
    res.status(500).send(error)
  })
})

routes.get('/api/osram/nodeStatus', (req, res) => {
  var lightifyConnection = new lightify.lightify(process.env.OSRAM_GATEWAY_BASE_IP)
  lightifyConnection.connect().then(function () {
    return lightifyConnection.getStatus(req.query.mac)
  }).then(function (data) {
    lightifyConnection.dispose()
    res.send(data)
  }).catch(function (error) {
    lightifyConnection.dispose()
    res.status(500).send(error)
  })
})

routes.get('/api/osram/nodeOnOff', (req, res) => {
  var lightifyConnection = new lightify.lightify(process.env.OSRAM_GATEWAY_BASE_IP)
  lightifyConnection.connect().then(function () {
    return lightifyConnection.nodeOnOff(req.query.mac, req.query.on === '1', false)
  }).then(function (data) {
    lightifyConnection.dispose()
    res.send(data)
  }).catch(function (error) {
    lightifyConnection.dispose()
    res.status(500).send(error)
  })
})

routes.get('/api/osram/nodeBrightness', (req, res) => {
  var lightifyConnection = new lightify.lightify(process.env.OSRAM_GATEWAY_BASE_IP)
  lightifyConnection.connect().then(function () {
    return lightifyConnection.nodeBrightness(req.query.mac, req.query.brightness, 0, false)
  }).then(function (data) {
    lightifyConnection.dispose()
    res.send(data)
  }).catch(function (error) {
    lightifyConnection.dispose()
    res.status(500).send(error)
  })
})

routes.get('/api/osram/nodeTemperature', (req, res) => {
  var lightifyConnection = new lightify.lightify(process.env.OSRAM_GATEWAY_BASE_IP)
  lightifyConnection.connect().then(function () {
    return lightifyConnection.nodeTemperature(req.query.mac, req.query.temperature, 0, false)
  }).then(function (data) {
    lightifyConnection.dispose()
    res.send(data)
  }).catch(function (error) {
    lightifyConnection.dispose()
    res.status(500).send(error)
  })
})

routes.get('/api/osram/nodeColor', (req, res) => {
  var lightifyConnection = new lightify.lightify(process.env.OSRAM_GATEWAY_BASE_IP)
  lightifyConnection.connect().then(function () {
    return lightifyConnection.nodeColor(req.query.mac, req.query.red, req.query.green, req.query.blue, 255, 0, false)
  }).then(function (data) {
    lightifyConnection.dispose()
    res.send(data)
  }).catch(function (error) {
    lightifyConnection.dispose()
    res.status(500).send(error)
  })
})

module.exports = routes
