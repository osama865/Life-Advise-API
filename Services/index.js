const { db } = require('../Model/Schema');
const User = require('../Model/Schema');

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

exports.findUserWithAuthKey = async (authKey)=>{
    return await User.findOne({ authKey })
}

exports.findUser = async (filter)=>{
    console.log(filter , 'hssssssssssssssssss');
    return await User.findOne(filter)
}

exports.updateUserRequests = async (authKey)=>{
    return await User.findOneAndUpdate({ authKey },{ $inc : { requests : 1}})
}



exports.fetch_random = async () => {
    // later change the size to dynamic size.
    return await db.collection("advices").aggregate([{ $sample: { size: 1 } }]).toArray()
}

exports.fetch_by_author = async (author, options) => {
    // later change the size to dynamic size.
    let authorQuotes = await db.collection("advices").find({ author: author }, options).toArray()
    return authorQuotes
}

exports.fetch_by_language = async ({ language, options }) => {
    // fetch quotes or advice in specific language
    return await db.collection("advices").find({ language: language }, options).toArray()

}

exports.fetch_multiple = async ({filter, options}) => {
    // later change the size to dynamic size.
    return await db.collection("advices").find(filter, options).toArray()
}