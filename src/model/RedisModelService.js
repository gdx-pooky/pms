/**
 * Created by qi on 2016/11/29.
 */
import logger from 'koa-log4';
import RedisService from '../db/RedisService';
const monitor = logger.getLogger('monitor');
const expireTime = 24*60*60;

class RedisModelService {

    constructor () {
        this.NickKey = '_ProhibitedWords:nick';
        this.SignatureKey = '_ProhibitedWords:signature';
        this.CommentKey = '_ProhibitedWords:comment';
        this.ArtivleKey = '_ProhibitedWords:article';
    }

    queryCache (key) {
        return new Promise((resolve,reject) => {
            RedisService.redisClient.get(key,(err,result) => {
                if (err) {
                    monitor.error(`redis get data error: ${err}, key: ${key}`);
                    resolve(null);
                }else{
                    resolve(result);
                }
            })
        })
    }

    setCache (key,words) {
        return new Promise((resolve,reject) => {
            RedisService.redisClient.set(key,words,'ex',expireTime);
            resolve(`set key : ${key} success`);
        })
    }

    deleteCache (key) {
        return new Promise((resolve,reject) => {
            RedisService.redisClient.get(key,(err,result) => {
                if (err) {
                    monitor.error(`redis get data error: ${err}, key: ${key}`);
                    resolve(null);
                }else{
                    if(result){
                        RedisService.redisClient.del(key);
                        resolve(`delete key : ${key} success`);
                    }
                }
            })
        })
    }
}

export default RedisModelService;