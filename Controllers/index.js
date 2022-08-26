const mongoose = require("mongoose");
const advice = require('./advice')
const users = require("./users")


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




// TODO translate route, simply tranlste quotes to another languages before sending it to client
// TODO set object { translte : boolean, langauge}, if existed then send the fetched data to

// TODO change every .then().catch() into try catch async await modular

// translate function, and then send the returned data
// quotes to the specified language and then send to the client 


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
    users,
    advice
}