/**
 * Created by qi on 2016/11/26.
 */
/*昵称检测服务*/
import NickNameInspect from '../controllers/NickNameInspect';
import ResultProcessor from '../lib/ResultProcessor';
import logger from 'koa-log4';
const monitor = logger.getLogger('monitor');
const nickNameInspect = new NickNameInspect();
const resultProcessor = new ResultProcessor();

const NickInspectService = async (ctx,next) => {
    let uid = ctx.request.body.uid;
    let text = ctx.request.body.nick_name;

    let result = await nickNameInspect.appUserNickInspect(uid,text);
    ctx.response.body = resultProcessor.decide(result);
};


module.exports = [
    {path:'/api/BanWordAudit/userNick', method:'POST',mapping:NickInspectService}
];