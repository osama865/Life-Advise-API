var redis = require('redis');
var util = require('util');
var client = redis.createClient();
(async function () {
    await client.connect()
})()

client.on('error', function (err) {
    console.log('Something went wrong ', err)
});

client.on('connect', function () {
    console.log('good')
});

client.get = util.promisify(client.get)


/**
 * const { createClient } = require('redis');
let client
async function nodeRedisDemo() {
    try {
        client = createClient();
        await client.connect();
        // await client.quit();
    } catch (e) {
        console.error(e);
    }
}
nodeRedisDemo();

console.log(client.get("mykey"));
 */