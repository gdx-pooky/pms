/**
 * Created by qi on 2016/11/29.
 */
import mysql from 'mysql2';
import _each from 'lodash/each';
import _findKey from 'lodash/findKey';
import logger from 'koa-log4';
const monitor = logger.getLogger('monitor');

class MySQLService {

    constructor() {
        this.pool = null;
        this.poolCluster = null;
    }

    //创建mysql连接池
    createPool (config) {
        if(this.poolCluster){
            monitor.error('already created pool cluster');
            process.exit(2);
        }
        this.pool = mysql.createPool(config);
        this.pool.on('enqueue',()=> {
            monitor.warn(`Waiting for available connection slot , host : ${config.host}`);
        });
        monitor.info(`create pool successful ! host : ${config.host}`);
    }

    //创建mysql集群
    createPoolCluster (configs) {
        if(this.pool){
            monitor.error('already created pool');
            process.exit(2);
        }
        this.poolCluster = mysql.createPoolCluster();
        _each(configs,(item)=> {
            let instanceName = _findKey(item);
            this.poolCluster.add(instanceName, item[instanceName]);
            monitor.info(`create pool of cluster successful ! host : ${item[instanceName].host}`);
        });
    }

    static getInstance() {
        if (!MySQLService.instance) {
            MySQLService.instance = new MySQLService();
        }
        return MySQLService.instance;
    }
}

export default MySQLService.getInstance();