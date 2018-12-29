const Hapi = require('hapi');
const Qihu = require('./bin/qihu');
const Beiwo = require('./bin/beiwo');

const server = Hapi.server({
    port: 8081
});
// process.on('uncaughtException', function (err) {
//     //打印出错误
//     console.log(err);
//     //打印出错误的调用栈方便调试
//     console.log(err.stack) ；
// });
var logger = require('./lib/log');

class Server {
    constructor() {
        this.qihu = new Qihu();
        this.beiwo = new Beiwo();
        this.start();

    }
    async start() {
        logger.info('start server');
        try {
            await server.start();
        }
        catch (err) {
            logger.info('start server faild' + JSON.stringify(err));
            return false;
        }
        console.log('Server running at:', server.info.uri);
        this.route();
        return true;
        // 
    }
    async route() {
        var self = this;
        server.route({
            method: '*',
            path: '/search',
            handler: async function (request, h) {
                var query = request.query;
                if (!query.keyword) {
                    return { status: -1, msg: '请传入参数keyword' }
                }
                var from = 'online';
                if (!!query && !!query.from) {
                    from = query.from;
                }
                var albums;
                if (from == 'online') {
                    try {
                        albums = await self.qihu.search(query.keyword);
                    } catch (error) {
                        albums = false;
                    }
                    
                }
                else {
                    try {
                        albums = await self.beiwo.search(query.keyword);
                    } catch (error) {
                        albums = false;
                    }
                }
                if (albums) {
                    return { status: 1, data: albums }
                }
                else {
                    return { status: -2, msg: '获取失败' }
                }
            }
        });
    }

}
var serverintance = new Server();
