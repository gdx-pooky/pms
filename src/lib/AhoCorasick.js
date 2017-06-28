/**
 * Created by qi on 2016/12/9.
 */
import ahocorasick from 'node-aho-corasick';
import LocalBanListService from '../model/LocalBanListService';
import RedisModelService from '../model/RedisModelService';
import logger from 'koa-log4';
import {ACTREE_UPDATE_TIME_CACHE_KEY} from './constants';

const monitor = logger.getLogger('monitor');

const localBanListService = new LocalBanListService();
const redisModelService = new RedisModelService();

class AhoCorasick {

    constructor(){
        this.acTree = new ahocorasick();
    }

    async createAhoCorasickTree () {

        monitor.info('start create AhoCorasick tree');
        let
            start = new Date().getTime(),
            execTime;
        let words_array = await localBanListService.queryBanListAll();

        for(let word of words_array){
            this.acTree.add(word.ban_word)
        }
        this.acTree.build();
        execTime = new Date().getTime() - start;
        monitor.info(`End create AhoCorasick tree use : ${execTime} ms`);
        let lastTime = await localBanListService.queryBanListUpdate();
        let timeCache;
        if(lastTime[0]){
            timeCache = lastTime[0].update_time;
        }else{
            timeCache = new Date();
        }
        redisModelService.setCache(ACTREE_UPDATE_TIME_CACHE_KEY,JSON.stringify({time:timeCache}))
    }

    async updateAhoCorasickTree () {
        let timeArray = await Promise.all([
            localBanListService.queryBanListUpdate(),
            redisModelService.queryCache(ACTREE_UPDATE_TIME_CACHE_KEY)
        ]);

        if(timeArray[1]){
            if(timeArray[0][0].update_time != JSON.parse(timeArray[1]).time){
                this.createAhoCorasickTree();
            }
        }
    }

    startMatch (text) {
        return this.acTree.search(text);
    }

    static getInstance() {
        if (!AhoCorasick.instance) {
            AhoCorasick.instance = new AhoCorasick();
        }
        return AhoCorasick.instance;
    }
}

export default AhoCorasick.getInstance();
