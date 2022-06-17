/**
 * All thae app routea lays here
 * The user first register to get his/her authentication key
 * Whenever new request come, it must has the authentication key to verfy its identity
 * 
*/
const Router = require("express").Router();

const { register, fetchOne, fetchMultiple, fetchByAuthor, fetchByLanguage } = require("../Controllers")

Router.post('/register', register)

Router.post('/check', (req, res) => {
    console.log(req.body);
})

Router.get('/one', fetchOne)

Router.post('/author', fetchByAuthor)

Router.post('/lang', fetchByLanguage)

Router.post('/multiple', fetchMultiple)

Router.get('/', (req, res) => {
    res.send('Hello to My Wonderful Quotes APIs')
})

module.exports = {
    Router
}