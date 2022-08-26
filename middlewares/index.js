const User = require("../Model/Schema");
const { findUser, updateUserRequests, findUserWithAuthKey } = require("../Services");

const checkRateLimitMiddleware = async (req, res, next) => {
    const providedAuthKey = req.header('x-api-key')
    console.log("i'm a middleware", providedAuthKey);
    // first of all get the user data
    if (providedAuthKey !== undefined) {
        findUserWithAuthKey(providedAuthKey).then((result) => {
            // check if the user reached or exeeded the allowed quota
            if (result.requests >= result.quota) {
                // if so, response with 429, Too many requests
                res.set('Retry-After', "24 hours, or contact the API devleoper to expand your Quota.")
                res.sendStatus(429)
                res.end()
            } else {
                // if not, response as usuall.
                next()
            }
        }).catch((err) => {
            console.log(err);
        });
    } else {
        next()
    }
}

const updateRequestsMiddleware = async (req, res, next) => {
    const providedAuthKey = req.header('x-api-key')
    console.log("i'm a middleware, requests updater", providedAuthKey);
    updateUserRequests(providedAuthKey).then((result) => {
        next()
    }).catch((err) => {
        console.log(err);
    });
}

// FIX rename verfy to verfyMiddleware.
const verfy = async (req, res, next) => {
    // first of all extract the API key from the header
    const authKey = req.header('x-api-key')
    // if there is auth Key
    if (authKey) {
        try {
            // get the user object, using auth key as a filter
            const result = await User.findOne({ authKey })
            // if there is no account with the provided API key, iform user to get real
            if (result === null || authKey !== result.authKey) {
                res.status(401).json({ message: "Your'authentication Key is invalid, Get new key by registration. /n It may be you did put the wrong key in the header when you made the request." })
                res.end()
            } else {
                // if everything is ok, work as usuall
                next()
            }
        } catch (error) {
            console.log("wrong", error);
        }
    } else {
        // if there is no API key provided, ask the user to provide the api key
        next()
        // res.status(401).json({ message: "You don't have an authentication Key, Please get your key by registration. /n It may be you didn't put the key in the header when you made the request." })
        // res.end()
    }
}

const limitation = async (req, res, next) => {

    const options = req.query.options || req.body.options
    if (!options.limit || options.limit === null) {
        options.limit = 500
    }

    next()
}

module.exports = {
    checkRateLimitMiddleware,
    updateRequestsMiddleware,
    verfy,
    limitation
}