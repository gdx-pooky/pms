import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import logger from 'koa-log4';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import {ArgumentParser} from 'argparse';
import Router from './Router';
import templating from './templating';
import MySQLService from './db/MySQLService';
import RedisService from './db/RedisService';
import AhoCorasick from './lib/AhoCorasick';
import {timedTask} from './lib/timedTask';
import {devMiddleware} from 'koa2-webpack-middleware';
import webpackCfg from  '../webpack.config';
import webpack from 'webpack';
const compile = webpack(webpackCfg);
const app = new Koa();
app.use(devMiddleware(compile,{
    publicPath: '/static/'
}));


const rootPath = fs.realpathSync(path.dirname(__dirname));
const logDir = path.join(rootPath, "/logs/");
if (!fs.existsSync(logDir)) {
    mkdirp.sync(logDir);
}

const parser = new ArgumentParser({
    version: require("../package.json").version,
    addHelp: true,
    description: "Prohibited words Server"
});

parser.addArgument(["-p","--port"], {
    required: true,
    help: "listen port",
    dest: "port"
});
parser.addArgument(["-c","--config"], {
    required: false,
    help: 'config file',
    dest: "configFile"
});

const argument = parser.parseArgs();
if (!fs.existsSync(argument.configFile)) {
    console.error(argument.configFile + " not existed");
    process.exit(1);
}

const options = require(fs.realpathSync(argument.configFile));

const monitor = logger.getLogger('monitor');
logger.configure(options.log);
app.use(logger.koaLogger(logger.getLogger('monitor'), options.log));

app.use(bodyParser());

//response 添加响应时间
/*app.use(async (ctx, next) => {
    monitor.log(`Process ${ctx.request.method} ${ctx.request.url} `);
    let
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});*/

app.use(serve(`${path.dirname(__dirname)}/static`));

app.use(templating('views', {
    noCache: true,
    watch: true
}));


// add router middleware
app.use(Router());

app.listen(parseInt(argument.port));
monitor.info(`Prohibited Words Server started at port ${argument.port}`);

RedisService.createRedisClient(options.WordsCacheRedis);
MySQLService.createPool(options.onlineMysql);

process.nextTick(function () {
    AhoCorasick.createAhoCorasickTree();
});

timedTask(options.timedTaskOptions);

app.on('error',(err)=>{
    monitor.error(`monitor on error : ${err}`);
});



