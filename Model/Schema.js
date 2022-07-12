const mongoose = require("mongoose");

/**
 user scheme = {
     _id,
     username,
     hashedPassword,
     authKey,
     connectionsAmount,
     date,
     email

 }
 */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    authKey: {
        type: String,
        required: true,
    },
    requests: {
        type: Number,
        default: 0
    },
    quota: {
        type: Number,
        default: 50000
    },
    date: { type: Date, default: Date.now },
    email: { type: mongoose.SchemaTypes.String },
});

const User = mongoose.model("User", UserSchema);
try {
    User.createCollection("users")
} catch (error) {

}

const AdviceSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const Advice = mongoose.model("advices", AdviceSchema);

module.exports = { User, Advice };