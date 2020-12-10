const cron = require('node-cron')

const fetchAllCityWeather = require('./scraper')

/**
 * Function to schedule a cron job
 */
const scheduleCron = () => {
    fetchAllCityWeather()
    cron.schedule('0 6 * * *', fetchAllCityWeather , {
        timezone: 'Asia/Kolkata'
    })
}

module.exports = scheduleCron