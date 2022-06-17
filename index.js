const app = require('express')()
const cors = require('cors');
const bodyParser = require("body-parser");
const { Router } = require('./routes');
const { verfy, checkRateLimitMiddleware, updateRequestsMiddleware } = require('./middlewares');

const PORT = process.env.PORT || 3003
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(verfy)
app.use(checkRateLimitMiddleware)
app.use(updateRequestsMiddleware)

app.use(Router)
app.use(cors())

app.listen(PORT, () => {
    console.log('hey');
})