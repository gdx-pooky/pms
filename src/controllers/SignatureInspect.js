/**
 * Created by qi on 2016/12/1.
 */
import LocalBanListService from '../model/LocalBanListService'
import logger from 'koa-log4';
import {
    PROHIBITED_SOURCE_SIGNATURE,
    PROHIBITED_LEXICON_UGC
} from '../lib/constants';
import ahoCorasick from '../lib/AhoCorasick';
import {handleMatch} from '../utils/handleMatch';
const monitor = logger.getLogger('monitor');
const localBanListService = new LocalBanListService();

class SignatureInspect {

    async appSignatureInspect(uid,sourceContent) {

        //start match keywords
        let matchResult = ahoCorasick.startMatch(sourceContent);
        let response = await handleMatch(matchResult,PROHIBITED_LEXICON_UGC);

        localBanListService.insertBanList({
            relevant_id:uid,
            type:PROHIBITED_SOURCE_SIGNATURE,
            abstract:sourceContent,
            is_artificial:response.is_artificial,
            machine_audit_status:response.machine_audit,
            ban_word:response.ban_words
        });

        return response;

    }

}

export default  SignatureInspect;