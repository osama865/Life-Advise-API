const hasBodyMiddleware = async (req, res, next) => {
    if (req.body){
        next()
    } else {
        res.status(400).send("No body added")
    }
}

module.exports = {
    hasBodyMiddleware,
}