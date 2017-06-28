/**
 * Created by qi on 2016/12/9.
 */
import LocalBanListService from '../model/LocalBanListService';
import _join from 'lodash/join';
import {
    TO_ARTIFICIAL_AUDIT,
    NO_ARTIFICIAL_AUDIT,
    MACHINE_AUDIT_PASS,
    MACHINE_AUDIT_REFUSE
} from '../lib/constants';
const localBanListService = new LocalBanListService();

const handleMatch = async (matchResult,type) => {

    if(matchResult.length > 0){
        let is_artificial = TO_ARTIFICIAL_AUDIT;
        let result = await localBanListService.queryBanListMatch(matchResult,type);
        if(result.length > 0){
            is_artificial = NO_ARTIFICIAL_AUDIT;
        }

        return {
            is_artificial:is_artificial,
            machine_audit:MACHINE_AUDIT_REFUSE,
            ban_words:_join(matchResult)
        };
    }else{
        return {
            is_artificial:TO_ARTIFICIAL_AUDIT,
            machine_audit:MACHINE_AUDIT_PASS,
            ban_words:''
        };
    }


};

export {
    handleMatch
}