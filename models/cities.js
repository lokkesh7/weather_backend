const Sequelize = require('sequelize')

const sequelize = require('../util/database')

// Model for Cities table created via Sequelize ORM

const Cities = sequelize.define('cities', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Cities