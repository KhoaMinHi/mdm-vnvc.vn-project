const redis = require('redis');

let redisClient;
if (process.env.REDIS_CLOUD == 'true' || 1 == 1) { //add || 1==1 because the env didn't run.
    redisClient = redis.createClient({
        socket: {
            host: "redis-10932.c274.us-east-1-3.ec2.cloud.redislabs.com",
            port: 10932
        },
        password: "Osas1ygbrOm9MwPEAiKohXmOwGtaKK4Z",
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
console.log("host: ", process.env.REDIS_HOST_CLOUD + ", port: " +process.env.REDIS_PORT_CLOUD);

(async () => {
    try {
        //check connect to redis if not connect then return error
        redisClient.on('error', async err => {
            console.log("Can't connect to redis ", err);
        });

        redisClient.on('ready', () => {
            console.log('Redis is ready');
        });
        await redisClient.connect();
        await redisClient.hSet("province:region",
            {
                "Thành phố Hà Nội": "mienbac","Tỉnh Bắc Kạn": "mienbac",
                "Tỉnh Tuyên Quang": "mienbac",
    "Tỉnh Lào Cai": "mienbac",
    "Tỉnh Điện Biên": "mienbac",
    "Tỉnh Lai Châu": "mienbac",
    "Tỉnh Sơn La": "mienbac",
    "Tỉnh Yên Bái": "mienbac",
    "Tỉnh Hoà Bình": "mienbac",
    "Tỉnh Thái Nguyên": "mienbac",
    "Tỉnh Lạng Sơn": "mienbac",
    "Tỉnh Quảng Ninh": "mienbac",
    "Tỉnh Bắc Giang": "mienbac",
    "Tỉnh Phú Thọ": "mienbac",
    "Tỉnh Vĩnh Phúc": "mienbac",
    "Tỉnh Bắc Ninh": "mienbac",
    "Tỉnh Hải Dương": "mienbac",
    "Thành phố Hải Phòng": "mienbac",
    "Tỉnh Hưng Yên": "mienbac",
    "Tỉnh Thái Bình": "mienbac",
    "Tỉnh Hà Nam": "mienbac",
    "Tỉnh Nam Định": "mienbac",
    "Tỉnh Ninh Bình": "mienbac",
    "Tỉnh Thanh Hóa": "mientrung",
    "Tỉnh Nghệ An": "mientrung",
    "Tỉnh Hà Tĩnh": "mientrung",
    "Tỉnh Quảng Bình": "mientrung",
    "Tỉnh Quảng Trị": "mientrung",
    "Tỉnh Thừa Thiên Huế": "mientrung",
    "Thành phố Đà Nẵng": "mientrung",
    "Tỉnh Quảng Nam": "mientrung",
    "Tỉnh Quảng Ngãi": "mientrung",
    "Tỉnh Bình Định": "mientrung",
    "Tỉnh Phú Yên": "mientrung",
    "Tỉnh Khánh Hòa": "mientrung",
    "Tỉnh Ninh Thuận": "mientrung",
    "Tỉnh Bình Thuận": "mientrung",
    "Tỉnh Kon Tum": "mientrung",
    "Tỉnh Gia Lai": "mientrung",
    "Tỉnh Đắk Lắk": "mientrung",
    "Tỉnh Đắk Nông": "mientrung",
    "Tỉnh Lâm Đồng": "mientrung",
    "Tỉnh Bình Phước": "miennam",
    "Tỉnh Tây Ninh": "miennam",
    "Tỉnh Bình Dương": "miennam",
    "Tỉnh Đồng Nai": "miennam",
    "Tỉnh Bà Rịa - Vũng Tàu": "miennam",
    "Thành phố Hồ Chí Minh": "miennam",
    "Tỉnh Long An": "miennam",
    "Tỉnh Tiền Giang": "miennam",
    "Tỉnh Bến Tre": "miennam",
    "Tỉnh Trà Vinh": "miennam",
    "Tỉnh Vĩnh Long": "miennam",
    "Tỉnh Đồng Tháp": "miennam",
    "Tỉnh An Giang": "miennam",
    "Tỉnh Kiên Giang": "miennam",
    "Thành phố Cần Thơ": "miennam",
    "Tỉnh Hậu Giang": "miennam",
    "Tỉnh Sóc Trăng": "miennam",
    "Tỉnh Bạc Liêu": "miennam",
    "Tỉnh Cà Mau": "miennam"
            }
        );
        const value = await redisClient.hGetAll("province:region"); //get value of key key
        const keys = await redisClient.keys('*');//get all keys
        await redisClient.quit();
        console.log("value: ", value);
        //res.send(`<h2>${keys}</h2><h1>Value: ${value}</h1>`);
    } catch (error) {
        console.log(error);
        await redisClient.disconnect();
    }
})();