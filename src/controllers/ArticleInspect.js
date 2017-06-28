/**
 * Created by qi on 2016/12/2.
 */
import logger from 'koa-log4';
import {
    PROHIBITED_SOURCE_OGCARTICLE,
    PROHIBITED_SOURCE_CRAWLER,
    PROHIBITED_LEXICON_CRAWLER,
    PROHIBITED_LEXICON_UGC
} from '../lib/constants';
import ahoCorasick from '../lib/AhoCorasick';
import {handleMatch} from '../utils/handleMatch';
import LocalBanListService from '../model/LocalBanListService';
const monitor = logger.getLogger('monitor');
const localBanListService = new LocalBanListService();

class ArticleInspect {

    async cmsArticleInspect(body) {
        let news_id = body.news_id;
        let title = body.title;
        let content = body.content;
        let sourceContent = title+content;

        //start match keywords
        let matchResult = ahoCorasick.startMatch(sourceContent);
        let response = await handleMatch(matchResult,PROHIBITED_LEXICON_UGC);

        localBanListService.insertBanList({
            relevant_id:news_id,
            type:PROHIBITED_SOURCE_OGCARTICLE,
            abstract:title,
            is_artificial:response.is_artificial,
            machine_audit_status:response.machine_audit,
            ban_word:response.ban_words
        });

        return response;

    }

    async crawlerArticleInspect (body) {
        let db_name = body.db_name;
        let collection_name = body.collection_name;
        let data_id = body.data_id;
        let title = body.title;
        let content = body.content;
        let sourceContent = title+content;

        //start match keywords
        let matchResult = ahoCorasick.startMatch(sourceContent);
        let response = await handleMatch(matchResult,PROHIBITED_LEXICON_CRAWLER);

        localBanListService.insertBanList({
            type:PROHIBITED_SOURCE_CRAWLER,
            db_name:db_name,
            collection_name:collection_name,
            data_id:data_id,
            abstract:title,
            is_artificial:response.is_artificial,
            machine_audit_status:response.machine_audit,
            ban_word:response.ban_words
        });

        return response;


    }

}

export default ArticleInspect;