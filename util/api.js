const axios = require('axios')

/**
 * Function returning Open weather data via api for respective city(q)
 * @param {query: string} q 
 */

const weatherAPI = (q) => axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
    params: {
        q
    },
    headers: {
        'x-rapidapi-key': '27dae53153msh184f378403fdbe4p111612jsn9ab85ab7eca5',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
}) 

module.exports = weatherAPI