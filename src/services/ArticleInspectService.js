/**
 * Created by qi on 2016/11/22.
 */
/*文章检测服务*/
import ArticleInspect from '../controllers/ArticleInspect';
import ResultProcessor from '../lib/ResultProcessor';
import logger from 'koa-log4';
const monitor = logger.getLogger('monitor');
const articleInspect = new ArticleInspect();
const resultProcessor = new ResultProcessor();

const CMSArticleInspectService = async (ctx,next) => {
    let result = await articleInspect.cmsArticleInspect(ctx.request.body);

    ctx.response.body = resultProcessor.decide(result);
};

const CrawlerArticleInspectService = async (ctx,next) => {
    let result = await articleInspect.crawlerArticleInspect(ctx.request.body);

    ctx.response.body = resultProcessor.decide(result);
};

module.exports = [
    {path:'/api/BanWordAudit/CMSArticle', method:'POST',mapping:CMSArticleInspectService},
    {path:'/api/BanWordAudit/CrawlerArticle', method:'POST',mapping:CrawlerArticleInspectService}
];