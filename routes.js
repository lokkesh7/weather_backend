const express = require('express')
const { elasticClient } = require('./lib/elastic')

const router = express.Router()

/**
 * route to fetch weather data for respective city
 */

router.get('/get_city_weather/:city',function(request,response){
    // Create query for the city name
    let query = {
      index: 'city-weatherdetails',
      body: {
        query: {
          match: {
            name: request.params.city
          }
        }
      }
    }
    // Search elastic engine and return the hits as response
    elasticClient.search(query)
    .then( res => {
        response.send({message: 'success', data: res.body.hits.hits})
    })
    .catch( err => {
        response.send(err)
    })
})

module.exports = router
