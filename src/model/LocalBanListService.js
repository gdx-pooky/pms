/**
 * Created by qi on 2016/12/2.
 */
import MySQLModelService from '../model/MySQLModelService';
import _join from 'lodash/join';
import _map from 'lodash/map';
import {
    ARTIFICIAL_AUDIT_WAIT
} from '../lib/constants';

class LocalBanListService extends MySQLModelService {

    async queryBanList (type) {
        return await super.query(require('./templates/queryBanList')({lexicon_id:type}));
    }

    async queryBanListAll () {
        return await super.query(require('./templates/queryBanListAll')());
    }

    async queryBanListUpdate () {
        return await super.query(require('./templates/queryBanListUpdate')());
    }

    async queryBanListMatch (words,type) {
        return await super.query(require('./templates/queryBanListMatch')({words:_join(_map(words,function (t) {
            return '"'+t+'"';
        })),type:type}));
    }

    async insertBanList (data) {
        data.artificial_audit_status = ARTIFICIAL_AUDIT_WAIT;
        data.machine_audit_time = new Date();
        super.insert('INSERT INTO local_ban_assist SET ?',data);
        return true;
    }
}

export default  LocalBanListService;