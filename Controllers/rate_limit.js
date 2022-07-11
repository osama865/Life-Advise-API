/**
 * status code 429, Too many request
 * comment : You exeeded the limit,
 * header : Retry-After
 * 
 */

const { findUser, updateUserRequests, findUserWithAuthKey } = require("../Services")

const checkRateLimit = async (authKey, terminate) => {
    findUserWithAuthKey(authKey).then((result) => {
        console.log(result);
        if (result.requests === result.quota || result.requests > result.quota) {
            console.log('rate limit exeeded')
            terminate()
        } else {
            return;
        }
    }).catch((err) => {
        console.log(err)
    });
}

const updateRequests = (authKey) => {
    updateUserRequests(authKey).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err)
    });
}

module.exports = {
    checkRateLimit,
    updateRequests
}