/**
 * Created by qi on 2016/12/3.
 */
import request from 'request';
import {expect} from 'chai';
import cp from 'child_process'
describe('interface 测试',function () {
    // before(function () {
    //     cp.exec('node ../start.js -p 9999 -c ../config/developConfig.js',function(e, stdout, stderr) {
    //         console.log('before');
    //         console.log(stderr);
    //         console.log(e);
    //         done();
    //     });
    // });

    // after(function () {
    //     console.log('after')
    // });

    describe('nick inspect interface 测试',function() {
        it('nick: shipengqi, should return : code = 1',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userNick',
                method: "POST",
                form: {
                    uid:6606,
                    nick_name:'shipengqi'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(1);
                done();
            });
        });

        it('nick: 习近平, should return : code = 2',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userNick',
                method: "POST",
                form: {
                    uid:6606,
                    nick_name:'习近平'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(2);
                done();
            });
        });

        it('nick: 汽狗, should return : code = 0',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userNick',
                method: "POST",
                form: {
                    uid:6606,
                    nick_name:'汽狗'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(0);
                done();
            });
        })
    });

    describe('signature inspect interface 测试', function() {
        it('signature: shipengqi, should return : code = 1',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userSignature',
                method: "POST",
                form: {
                    uid:6606,
                    signature:'shipengqi集散地立刻飞机数量'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(1);
                done();
            });
        });

        it('signature: 习近平, should return : code = 2',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userSignature',
                method: "POST",
                form: {
                    uid:6606,
                    signature:'习近平时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(2);
                done();
            });
        });

        it('signature: 汽狗, should return : code = 0',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userSignature',
                method: "POST",
                form: {
                    uid:6606,
                    signature:'汽狗派出所的洛克菲勒'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(0);
                done();
            });
        })
    });

    describe('comment inspect interface 测试', function() {
        it('comment: shipengqi, should return : code = 1',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userComment',
                method: "POST",
                form: {
                    uid:6606,
                    comment:'shipengqi集散地立刻飞机数量'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(1);
                done();
            });
        });

        it('comment: 习近平, should return : code = 2',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userComment',
                method: "POST",
                form: {
                    uid:6606,
                    comment:'习近平时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(2);
                done();
            });
        });

        it('comment: 汽狗, should return : code = 0',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/userComment',
                method: "POST",
                form: {
                    uid:6606,
                    comment:'汽狗派出所的洛克菲勒'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(0);
                done();
            });
        })
    });

    describe('CMS article inspect interface 测试', function() {
        it('CMS: shipengqi, should return : code = 1',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/CMSArticle',
                method: "POST",
                form: {
                    news_id:3436606,
                    title:'哈哈',
                    content:'shipengqi时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(1);
                done();
            });
        });

        it('CMS: 习近平, should return : code = 2',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/CMSArticle',
                method: "POST",
                form: {
                    news_id:3436606,
                    title:'哈哈',
                    content:'习近平时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(2);
                done();
            });
        });

        it('CMS: 汽狗, should return : code = 0',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/CMSArticle',
                method: "POST",
                form: {
                    news_id:3436606,
                    title:'汽狗',
                    content:'hah平时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(0);
                done();
            });
        })
    });

    describe('crawler article inspect interface 测试', function() {
        it('crawler: shipengqi, should return : code = 1',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/CrawlerArticle',
                method: "POST",
                form: {
                    data_id:3436606,
                    collection_name:'handwork_20161205',
                    db_name:'bdtt',
                    title:'哈哈',
                    content:'shipengqi时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(1);
                done();
            });
        });

        it('crawler: 习近平, should return : code = 2',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/CrawlerArticle',
                method: "POST",
                form: {
                    data_id:3436606,
                    collection_name:'handwork_20161205',
                    db_name:'bdtt',
                    title:'哈哈',
                    content:'习近平时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(2);
                done();
            });
        });

        it('crawler: 汽狗, should return : code = 0',function(done) {
            let options = {
                url: 'http://127.0.0.1:8080/api/BanWordAudit/CrawlerArticle',
                method: "POST",
                form: {
                    data_id:3436606,
                    collection_name:'handwork_20161205',
                    db_name:'bdtt',
                    title:'汽狗',
                    content:'时间里几乎是东方会计师'
                }
            };
            request(options, function(error, response, body) {
                expect(JSON.parse(body).code).to.be.equal(0);
                done();
            });
        })
    });
});

