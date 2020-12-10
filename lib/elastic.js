const { Client } = require("@elastic/elasticsearch");


// Create a elastic search client instance
const client = new Client({
  node: "http://localhost:9200",
});


// Check for the availability of service
client.ping({}, { requestTimeout: 30000 }, (err) => {
  if (err) {
    console.log('Error in elastic search',err);
  } else {
    console.log("Elastic search is running");
  }
});

/**
 * Function to check and create index 
 */
const checkAndCreateIndex = async () => {

    // check if the below index is available 
    const { body: isIndexPresent } = await client.indices.exists({
        index: 'city-weatherdetails'
    })

    // If the index is not present create an Index

    if(!isIndexPresent) {
        client.indices.create({
            index: 'city-weatherdetails'
        }, (err, res, stat) => {
            if(err) {
                console.log('Create ElasticSearch Index Error::::::::::',err)
            } else {
                console.log('Elastic Search Index created Successfully::::::::', res, stat)
            }
        })
    } else {
        console.log('ElasticSearch Index already Exists!!!')
    }
}

checkAndCreateIndex()

/**
 * Function to check atleast 1 document is present in the given index
 */
const isDocPresentInIndex = async () => {
    try {
        const { body } = await client.count({index: 'city-weatherdetails'})
        return Boolean(body.count)
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    elasticClient: client,
    isDocPresentInIndex
};
