const { mode } = require('crypto-js');
const redis = require('redis');

let redisClient;
if (process.env.REDIS_CLOUD == 'true') {
    redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST_CLOUD,
            port: process.env.REDIS_PORT_CLOUD
        },
        password: process.env.REDIS_PASSWORD_CLOUD,
        /*retry_strategy: function (options) {
            if (options.error && options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with
                // a individual error
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
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
        }*/
    });
}
else {
    redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST_LOCAL,
            port: process.env.REDIS_PORT_LOCAL,
        }
    });
}
console.log("host: ", process.env.REDIS_HOST_CLOUD + ", port: " + process.env.REDIS_PORT_CLOUD);

(async () => {
    try {
        //check connect to redis if not connect then return error
        redisClient.on('error', async err => {
            console.log("Can't connect to redis ", err);
        });

        redisClient.on('ready', () => {
            console.log('Redis is ready (config in redisService.js)');
        });
        await redisClient.connect();
    } catch (error) {
        console.log(error);
        await redisClient.disconnect();
        await redisClient.connect();
    }
})();

module.exports = redisClient;