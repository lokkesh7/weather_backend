const express = require("express");
const cors = require('cors')


const initAndSyncDB = require('./initDBService')
const cronRunner = require("./lib/cron");
const routes = require('./routes')

app = express();

app.use(cors())

// initialize and sync db function execution
initAndSyncDB()

//cron job scheduler execution
cronRunner();

app.use('/api',routes)

app.listen(8000, () => console.log("Node server running!!!"));
