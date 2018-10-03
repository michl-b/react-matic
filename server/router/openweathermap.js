const routes = require('express').Router()
const axios = require('axios')

routes.get('/api/openweathermap/current', (req, res) => {
  let apiKey = process.env.OPEN_WEATHER_MAP_API_KEY
  axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + req.query.city + '&APPID=' + apiKey + '&units=metric&lang=de')
    .then(axiosRes => {
      res.send(axiosRes.data)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

module.exports = routes
