const Sequelize = require('sequelize')

/**
 * Create Sequelize ORM instance to connect with MySQL DB
 */

const sequelize = new Sequelize('city_list', 'root', 'MySQL@123', {
    dialect:'mysql',
    host: 'localhost'
})

module.exports = sequelize