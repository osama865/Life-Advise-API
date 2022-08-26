const { addUser,  findUser } = require("../Services");
const { messages } = require("./messages")
const { uuid } = require("../Services/generateAuthKey");
const { hashCode } = require("../Services/hashing");


const register = async (req, res) => {
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    const hashedPassword = hashCode(password)
    const authKey = uuid()

    const response = {
        message: `Your API authentication key is ${authKey} KEEP IT SECRET and do not give it to anyone.`,
        authKey: authKey,
        error: null
    }

    // first make sure the user username and email are not duplicated
    findUser({ name, email }).then((result) => {
        if (result) {
            console.log("this user is found");
            res.status(409).send(messages(409))
            res.end()
        } else {
            const reqData = {
                name: name,
                hashedPassword: hashedPassword,
                authKey,
                email,
                quota: 2000,
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

module.exports = { register }