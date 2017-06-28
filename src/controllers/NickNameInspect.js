/**
 * Created by qi on 2016/11/26.
 */
import {handleMatch} from '../utils/handleMatch';
import LocalBanListService from '../model/LocalBanListService';
import ahoCorasick from '../lib/AhoCorasick';
import logger from 'koa-log4';
import {
    PROHIBITED_SOURCE_NICK,
    PROHIBITED_LEXICON_NICK
} from '../lib/constants';
const monitor = logger.getLogger('monitor');
const localBanListService = new LocalBanListService();

class NickNameInspect {

    async appUserNickInspect(uid,sourceContent) {

        //start match keywords
        let matchResult = ahoCorasick.startMatch(sourceContent);
        let response = await handleMatch(matchResult,PROHIBITED_LEXICON_NICK);

        localBanListService.insertBanList({
            relevant_id:uid,
            type:PROHIBITED_SOURCE_NICK,
            abstract:sourceContent,
            is_artificial:response.is_artificial,
            machine_audit_status:response.machine_audit,
            ban_word:response.ban_words
        });

        return response;
    }

}

export default  NickNameInspect;
