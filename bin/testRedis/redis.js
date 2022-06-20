const express = require('express');
const router = express.Router();
require('dotenv').config();
const redis = require('redis');


router.get('/', (req, res) => {
    const client = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST_CLOUD,
            port: process.env.REDIS_PORT_CLOUD
        },
        password: process.env.REDIS_PASSWORD_CLOUD,
        retry_strategy: function (options) {
            if (options.error && options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with
                // a individual error
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 10) {
                // End reconnecting after a specific timeout and flush all commands
                // with a individual error
                return new Error('Retry time exhausted');
            }
            if (options.attempt > 1) {
                // End reconnecting with built in error
                return undefined;
            }
            // reconnect after
            return Math.min(options.attempt * 100, 3000);
        }
    });

    (async () => {
        try {
            //check connect to redis if not connect then return error
            client.on('error', async err => {
                console.log("Can't connect to redis ", err);
            });

            client.on('ready', () => {
                console.log('Redis is ready');
            });
            await client.connect();

            await client.set('key', 'value');
            const value = await client.get('key'); //get value of key key
            const keys = await client.keys('*');//get all keys
            await client.quit();
            console.log("value: ", value);
            res.send(`<h2>${keys}</h2><h1>Value: ${value}</h1>`);
        } catch (error) {
            console.log(error);
            await client.disconnect();
        }
    })();
});


module.exports = router;