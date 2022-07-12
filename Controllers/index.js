const mongoose = require("mongoose");
const { addUser, fetch_random, fetch_multiple, fetch_by_author, fetch_by_language, findUser } = require("../Services");
const { uuid } = require("../Services/generateAuthKey");
const { hashCode } = require("../Services/hashing");
require("../Services/cache")
/**
 * All thae app logic lays here
 * Controller role is to extract data from request and call the right
 * method to handle the user request
 * Get user input.
 * Validate user input.
 * Validate if the user already exists.
 * Encrypt the user password.
 * Create a user in our database.
 * And finally, create a signed JWT token.
*/

// todo change these dummy messages to smart error handlers
const OK = {
    message: `You are authenticated, you can use the api as you want.`,
    secret: "i'm the secret flag, only choosen like you will obtain me."
}
const NotOK = {
    message: `You are not authenticated, you can't use this api.`,
    secret: "i'm the secret flag, only choosen will obtain me."
}

const noAdvicesForAuthor = {
    message: `Sorry but there is no quotes or advice said by this author .`
}

const noAdvicesForLang = {
    message: `Sorry but there is no quotes or advice in this language .`
}

const error = {
    message: "Sorry, some error happend",
    error: ""
}


// TODO translate route, simply tranlste quotes to another languages before sending it to client
// TODO set object { translte : boolean, langauge}, if existed then send the fetched data to
// translate function, and then send the returned data
// quotes to the specified language and then send to the client 
const register = async (req, res, next) => {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    const hashedPassword = hashCode(password)
    const authKey = uuid()

    const response = {
        message: `Your API authentication key is ${authKey} KEEP IT SECRET and do not give it to anyone.`,
        authKey: authKey
    }

    // first make sure the user username and email are not duplicated
    findUser({ name, email }).then((result) => {
        if (result) {
            console.log("this user is not found");
            res.status(409).send("This username or email is already in use!")
            res.end()
        } else {
            const reqData = {
                name: name,
                hashedPassword: hashedPassword,
                authKey,
                email,
                quota: 3,
                requests: 0
            }
            addUser(reqData).then((response) => {
                res.send(response)
            }).catch((err) => {
                response.error = err
                res.send(response)
                if (err) throw err
            })
        }
    })

}

const fetchOne = async (req, res, next) => {
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

const fetchMultiple = async (req, res, next) => {
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

const fetchByAuthor = async (req, res, next) => {
    const filter = req.body.filter
    const options = req.body.options

    fetch_by_author(filter, options).then((result) => {
        if (result.length === 0) {
            res.send(noAdvicesForAuthor)
        } else {
            res.send(result)
        }
    }).catch((err) => {
        res.send(error)
        if (err) throw err
    });
}

const fetchByLanguage = async (req, res, next) => {
    const filter = req.body.filter
    const options = req.body.options

    console.log(filter, options);
    fetch_by_language(filter, options).then((result) => {
        if (result.length === 0) {
            res.send(noAdvicesForLang)
        } else {
            res.send(result)
        }
    }).catch((err) => {
        res.send(error)
        if (err) throw err
    });
}

const url =
    "mongodb+srv://advice:XLUoDAWlrhoUjcaH@cluster0.ezstx.mongodb.net/life?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports = {
    register,
    fetchOne,
    fetchMultiple,
    fetchByAuthor,
    fetchByLanguage
}