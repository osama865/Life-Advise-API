const app = require('express')()
const cors = require('cors');
const bodyParser = require("body-parser");
const { Router } = require('./routes');
const { verfy, checkRateLimitMiddleware, updateRequestsMiddleware, limitation } = require('./middlewares');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(limitation)
// TODO use Promise.all or async.js to run all middlewares in parallel.
// TODO use cluster to run multiple instances of the app on the machine

/**
 * app.use(verfy)
app.use(checkRateLimitMiddleware)
app.use(updateRequestsMiddleware)
 */
app.use(Router)
app.use(cors())

module.exports = app