var redis = require('redis');
var mongoose = require('mongoose');
var util = require('util');
var client = redis.createClient();
(async function () {
    await client.connect()
})()

client.on('error', function (err) {
    console.log('Something went wrong ', err)
});

client.on('connect', function () {
    console.log('Redis Connected!')
});

// client.get = util.promisify(client.get)
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function () {
    this.useCache = true
    return this;
}

mongoose.Query.prototype.exec = async function () {
    console.log('iam about to run a query');

    if (!this.useCache) {
        return exec.apply(this, arguments)
    }
    const key = JSON.stringify(Object.assign({}, this.getOptions(), this.getQuery()))

    // console.log("The KEY", key, this.getOptions());
    // do we have a value for 'key' in redis 
    const cacheData = await client.get(key)
    // if we do, return that
    if (cacheData) {
        console.log('served from cache yaaaaaaaay');
        return JSON.parse(cacheData)
    }
    // otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments)
    client.set(key, JSON.stringify(result))
    console.log('served from mongo');
    return result
}


//client.set("key", "query result")