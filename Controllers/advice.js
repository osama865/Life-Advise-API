const { fetch_random, fetch_multiple, fetch_by_author, fetch_by_language, } = require("../Services");

const { messages } = require("./messages")




const fetchOne = async (req, res) => {
    const providedAuthKey = req.header('x-api-key')
    const reqData = {
        authKey: providedAuthKey,
    }

    fetch_random().then((result) => {
        res.send(result[0])
    }).catch((err) => {
        if (err) throw err
    });

}

const fetchMultiple = async (req, res) => {
    const filter = req.body.filter
    const options = req.body.options

    if (options?.limit === 0) {
        res.send("You set the limit option to 0, this by default will fetch all the data in this collection, wich is not allowed")
        return;
    }

    fetch_multiple(filter, options).then((result) => {
        res.send(result)
    }).catch((err) => {
        if (err) throw err
    });
}

const fetchByAuthor = async (req, res) => {
    const filter = req.body.filter
    const options = req.body.options

    fetch_by_author(filter, options).then((result) => {
        if (result.length === 0) {
            res.send(messages(600))
        } else {
            res.send(result)
        }
    }).catch((err) => {
        res.send(error)
        if (err) throw err
    });
}

const fetchByLanguage = async (req, res) => {
    const filter = req.body.filter
    const options = req.body.options

    console.log(filter, options);
    fetch_by_language(filter, options).then((result) => {
        if (result.length === 0) {
            res.send(messages(601))
        } else {
            res.send(result)
        }
    }).catch((err) => {
        res.send(error)
        if (err) throw err
    });
}

module.exports = {
    fetchOne, fetchMultiple, fetchByAuthor, fetchByLanguage
}

/*

Router.get('/multipleg', async (req, res) => {
    const filter = (req.query.filter)
    const options = decodeURI(req.query.options)
    console.log(options, {
        name : "osama",age : 20
    });

    try {

        const result = await fetch_by_author(filter, options)
        res.send(result)

    } catch (error) {
        res.send(error)
        if (error) throw error
    }
})

Router.get('/authorg', (req, res) => {
    console.log(req.query);
    const filter = req.query.filter
    console.log(filter);
    res.send("hi mf")
})

*/