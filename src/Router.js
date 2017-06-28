/**
 * Created by qi on 2016/11/22.
 */
import fs from 'fs';
import path from 'path';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import logger from 'koa-log4';
const monitor = logger.getLogger('monitor');

function addMapping(router, service) {
    _each(service,(item) => {
        let method = item.method.toUpperCase();
        switch (method)
        {
            case 'GET':
                router.get(item.path, item.mapping);
                break;
            case 'POST':
                router.post(item.path, item.mapping);
                break;
            case 'PUT':
                router.put(item.path, item.mapping);
                break;
            case 'DELETE':
                router.del(item.path, item.mapping);
                break;
            default:
                console.log(`invalid URL: ${item.path}`);
        }
    })
}

function addServices(router,services_dir) {
    let files = fs.readdirSync(services_dir);
    let js_files = _filter(files,(file) => {
        return file.endsWith('.js');
    });
    monitor.info('begin register router');
    for (var f of js_files) {
        monitor.info(`process service: ${f}...`);
        let service = require(`${services_dir}/${f}`);
        addMapping(router, service);
    }
    monitor.info('register router finish');
}

export default function (dir) {
    let
        services_dir = dir || `${path.dirname(__dirname)}/src/services`, // 如果不传参数，扫描目录默认为'services'
        router = require('koa-router')();
        process.nextTick(async () => {
            addServices(router, services_dir);
        });
    return router.routes();
};