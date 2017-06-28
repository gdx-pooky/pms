/**
 * Created by qi on 2016/11/29.
 */
import logger from 'koa-log4';
import MySQLService from '../db/MySQLService';
const monitor = logger.getLogger('monitor');

class MySQLModelService {

    query (excuteSQL) {
        return new Promise((resolve,reject) => {
            MySQLService.pool.getConnection((err, conn)=> {
                if (err){
                    monitor.error(`POOL get connection err : ${err}`);
                    reject(err);
                }else{
                    conn.query(excuteSQL,function(err,rows){
                        conn.release();
                        if(err){
                            monitor.error(err);
                            reject(err);
                        }else{
                            resolve(rows);
                        }
                    });
                }
            });
        })
    }

    insert (excuteSQL,data) {
        return new Promise((resolve,reject) => {
            MySQLService.pool.getConnection((err, conn)=> {
                if (err){
                    monitor.error(`POOL get connection err : ${err}`);
                    reject(err);
                }else{
                    conn.query(excuteSQL,data,function(err,result){
                        conn.release();
                        if(err){
                            monitor.error(err);
                            reject(err);
                        }else{
                            resolve(result.insertId);
                        }
                    });
                }
            });
        })
    }
}

export default MySQLModelService;