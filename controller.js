const fs = require('fs');

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
        } else {
            console.log('invalid URL:'+url);
        }
    }
}

function addControllers(router, dir) {
    let files = fs.readdirSync(__dirname + '/' + dir);
    let files_js = files.filter((f) => {
        return f.endsWith('.js');
    });
    for (let f of files_js) {
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers';
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};