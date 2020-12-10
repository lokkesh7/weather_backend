const weatherAPI = require("../util/api");
const Cities = require("../models/cities");
const { elasticClient, isDocPresentInIndex } = require("./elastic");

/**
 * Function to fetch Weather Details for Each city from db
 * and save the data in Elastic search
 */

const fetchAllCityWeather = async () => {
    try {
        // fetch all cities from db
        const allCities = await Cities.findAll();
        const allCitysWeather = allCities.map(async (city) => {
            // get the weather details for each city from weatherapi
            const cityWeather = await weatherAPI(city.name);
            return cityWeather.data;
        });

        const weatherDetails = await Promise.all(allCitysWeather);

        // check atleast 1 document is present in elastic search index
        const isDocPresent = await isDocPresentInIndex();

        // If no doc present format data for bulk upload
        if (!isDocPresent) {
            const formattedData = [];
            weatherDetails.forEach((cityWeather) => {
                formattedData.push({
                    index: {
                        _index: "city-weatherdetails",
                        _type: "city-weather",
                    }
                });
                const cityWeatherData = {name: cityWeather.name,weather: [cityWeather]}
                formattedData.push(cityWeatherData);
            });

            // perform bulk upload operation
            elasticClient.bulk({ body: formattedData }, function (err, response) {
                if (err) {
                    console.log("Failed Bulk operation", err);
                } else {
                    console.log("Successfully imported", response);
                }
            });
        } else {
            // If atleast 1 document present do update on each document based on name of the city
            weatherDetails.forEach(async cityWeather => {
                try {
                    let query = {
                        index: 'city-weatherdetails',
                        body: {
                          script: {
                            source: 'ctx._source.weather.add(params.weather)',
                            params: {
                                weather: cityWeather
                            }
                          },
                          query: {
                            match: {
                              name: cityWeather.name
                            }
                          }
                        }
                    }
                    // Perform update By Query Operation for each data
                    await elasticClient.updateByQuery(query)
                } catch(err) {
                    console.log('Elastic Update Error:::::::::::::::', err)
                }
            })

        }
    } catch (err) {
        console.log("error :::::::::::::::::::::::::::::::::::::::", err);
    }
};

module.exports = fetchAllCityWeather;