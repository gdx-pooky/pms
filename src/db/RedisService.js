/**
 * Created by qi on 2016/11/29.
 */
import Redis from 'ioredis';
import logger from 'koa-log4';
const monitor = logger.getLogger('monitor');

class RedisService {

    constructor() {
        this.redisClient = null;
    }

    createRedisClient (config) {

        this.redisClient = new Redis(config);
        this.redisClient.on("connect",() => {
            monitor.info(`Connect to redis success , host: ${config.host}`);
        });
        this.redisClient.on("end",() => {
            console.warn( `End connection to redis , host : ${config.host}`);
        });
        this.redisClient.on("error", (err) => {
            console.error( `onnect redis : ${config.host} with error: ${err}`);
        });
    }

    static getInstance() {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

}

export default RedisService.getInstance();