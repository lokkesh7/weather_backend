const sequelize = require("./util/database");
const Cities = require('./models/cities')

/**
 * Function to intialize DB and sync the instance with live DB
 */

module.exports = () => {
  sequelize
    .sync() // Sync the instance with live DB
    .then((_) => {
        //Check if atleast 1 city is present in the db
        return Cities.findByPk(1)
    })
    .then(city => {
        //If no city is present create cities list
        if(!city) {
            const cities = [
                {name: 'chennai'},
                {name: 'coimbatore'},
                {name: 'bangalore'},
                {name: 'new delhi'},
                {name: 'mumbai'},
                {name: 'pune'},
                {name: 'goa'},
                {name: 'shimla'},
                {name: 'hyderabad'},
                {name: 'lucknow'}
            ]
            // Perform  bulk upload operation and create rows in table
            return Cities.bulkCreate(cities)
        }
        return city
    })
    .then( _ => console.log(console.log("DB Connected and synced successfully")))
    .catch((err) => console.log("Error in DB Connection", err));
};
