const { Advice, User } = require('../Model/Schema');
const { db } = require('../Model/Schema');
require("./cache")

// all connections to database and queries lay here
exports.addUser = async (userData = {}) => {
    const user = new User(userData)
    try {
        await user.save()
    } catch (error) {
        console.log(error);
    }
    console.log("im the funny new user", user);
}

exports.findUserWithAuthKey = async (authKey) => {
    return await User.findOne({ authKey })
}

exports.findUser = async (filter) => {
    console.log(filter, 'hssssssssssssssssss');
    return await User.findOne(filter)
}

exports.updateUserRequests = async (authKey) => {
    return await User.findOneAndUpdate({ authKey }, { $inc: { requests: 1 } })
}



exports.fetch_random = async () => {
    // later change the size to dynamic size.
    return await Advice.aggregate([{ $sample: { size: 1 } }])
}

// use .cache to determinde weater to cache this query or not
exports.fetch_by_author = async (filter, options) => {
    // later change the size to dynamic size.
    let result = await Advice.find(filter, null, options).cache()
    return result
}

exports.fetch_by_language = async (filter, options) => {
    // fetch quotes or advice in specific language
    return await Advice.find(filter, null, options).cache()
}

exports.fetch_multiple = async (filter, options) => {
    // later change the size to dynamic size.
    return await Advice.find(filter, null, options).cache()
}