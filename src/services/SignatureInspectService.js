/**
 * Created by qi on 2016/11/22.
 */
/*签名检测服务*/
import SignatureInspect from '../controllers/SignatureInspect';
import ResultProcessor from '../lib/ResultProcessor';
import logger from 'koa-log4';
const monitor = logger.getLogger('monitor');
const signatureInspect = new SignatureInspect();
const resultProcessor = new ResultProcessor();


const SignatureInspectService = async (ctx,next) => {
    let uid = ctx.request.body.uid;
    let text = ctx.request.body.signature;

    let result = await signatureInspect.appSignatureInspect(uid,text);

    ctx.response.body = resultProcessor.decide(result);
};


module.exports = [
    {path:'/api/BanWordAudit/userSignature', method:'POST',mapping:SignatureInspectService}
];