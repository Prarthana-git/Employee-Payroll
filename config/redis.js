const redis = require('redis');
const client =redis.createClient();
const redisDatabase = async () => {
    try {
        await client.connect();    
        logger.info("Redis Connected")
    } catch (error) {
        console.log(error);
    }
}
module.export={client,redisDatabase};