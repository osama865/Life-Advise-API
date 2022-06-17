const { addUser, verfy, fetch_random, fetch_multiple, fetch_by_author, fetch_by_language } = require("../Services");
const { uuid } = require("../Services/generateAuthKey");
const { hashCode } = require("../Services/hashing");
const mongoose = require("mongoose");

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

const register = async (req, res, next) => {
    console.log('im the controller', req.body);
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    const hashedPassword = hashCode(password)
    const authKey = uuid()

    const response = {
        message: `Your API authentication key is ${authKey} KEEP IT SECRET and do not give it to anyone.`,
        authKey: authKey
    }
    console.log(response, 'shshsh');
    // addUser()
    const reqData = {
        name: name,
        hashedPassword: hashedPassword,
        authKey,
        email,
        quota: 3,
        requests: 0
    }
    addUser(reqData).then((res) => {
        res.send(response)
    }).catch((err) => {
        response.error = err
        res.send(response)
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
        console.log(err);
    });

}

const fetchMultiple = async (req, res, next) => {
    const providedAuthKey = req.body.authKey
    console.log("query and params", req.params);
    console.log("provided", providedAuthKey);
    const filter = req.body.filter
    const options = req.body.options

    const reqData = {
        authKey: providedAuthKey,
        filter,
        options
    }

    if (reqData.options?.limit === 0) {
        res.send("You set the limit option to 0, this by default will fetch all the data in this collection, wich is not allowed")
        return;
    }
    fetch_multiple(reqData).then((result) => {
        res.send(result)
    }).catch((err) => {
        error.error = err
        console.log(err);
        res.send(error)
    });
}

const fetchByAuthor = async (req, res, next) => {
    const author = req.body.author
    const limit = req.body.limit
    const skip = req.body.skip
    const reqData = {
        author,
        options: {
            limit,
            skip
        }
    }

    fetch_by_author(author, reqData.options).then((result) => {
        if (result.length === 0) {
            res.send(noAdvicesForAuthor)
        } else {
            res.send(result)
        }
    }).catch((err) => {
        res.send(error)
    });
}

const fetchByLanguage = async (req, res, next) => {
    const providedAuthKey = req.body.authKey
    const language = req.body.language
    const options = req.body.options

    const reqData = {
        authKey: providedAuthKey,
        language,
        options
    }

    fetch_by_language(reqData).then((result) => {
        if (result.length === 0) {
            res.send(noAdvicesForLang)
        } else {
            res.send(result)
        }
    }).catch((err) => {
        res.send(error)
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