/**
 * Created by qi on 2016/11/22.
 */
/*评论检测服务*/
import CommentInspect from '../controllers/CommentInspect';
import ResultProcessor from '../lib/ResultProcessor';
import logger from 'koa-log4';
const monitor = logger.getLogger('monitor');
const commentInspect = new CommentInspect();
const resultProcessor = new ResultProcessor();


const CommentNickInspectService = async (ctx,next) => {
    let uid = ctx.request.body.uid;
    let text = ctx.request.body.comment;

    let result = await commentInspect.appCommentInspect(uid,text);

    ctx.response.body = resultProcessor.decide(result);
};


module.exports = [
    {path:'/api/BanWordAudit/userComment', method:'POST',mapping:CommentNickInspectService}
];