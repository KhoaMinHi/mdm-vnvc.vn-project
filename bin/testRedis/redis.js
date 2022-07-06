const express = require('express');
const router = express.Router();
require('dotenv').config();
const redis = require('redis');
const client = require('../../components/redisService');

router.get('/', (req, res) => {
    // const client = redis.createClient({
    //     socket: {
    //         host: process.env.REDIS_HOST_CLOUD,
    //         port: process.env.REDIS_PORT_CLOUD
    //     },
    //     password: process.env.REDIS_PASSWORD_CLOUD,
    //     // retry_strategy: function (options) {
    //     //     if (options.error && options.error.code === 'ECONNREFUSED') {
    //     //         // End reconnecting on a specific error and flush all commands with
    //     //         // a individual error
    //     //         return new Error('The server refused the connection');
    //     //     }
    //     //     if (options.total_retry_time > 1000 * 10) {
    //     //         // End reconnecting after a specific timeout and flush all commands
    //     //         // with a individual error
    //     //         return new Error('Retry time exhausted');
    //     //     }
    //     //     if (options.attempt > 1) {
    //     //         // End reconnecting with built in error
    //     //         return undefined;
    //     //     }
    //     //     // reconnect after
    //     //     return Math.min(options.attempt * 100, 3000);
    //     // }
    // });

    (async () => {
        try {
            // //check connect to redis if not connect then return error
            // client.on('error', async err => {
            //     console.log("Can't connect to redis ", err);
            // });

            // client.on('ready', () => {
            //     console.log('Redis is ready in bin/testRedis/redis.js');
            // });
            //await client.connect();
            let key_value = "<h1 style='color:red'>I dont know about this middleware which was changed the tll in every call again!</h1>";
            const keys = await client.keys('*');//get all keys
            for (const key of keys) {
                if (key.includes("sess:")) {
                    let ttl="no get";
                    ttl = await client.sendCommand(['ttl', key]);
                    const value = await client.get(key);
                    key_value += `<p>${key} = {ttl: ${ttl}s, ${value}}</p>`;
                }
            }
            //await client.quit();
            //await client.disconnect();
            console.log("key value: ", key_value);
            res.send(key_value);
        } catch (error) {
            console.log(error);
            await client.disconnect();
            await client.connect();
        }
    })();
});


module.exports = router;