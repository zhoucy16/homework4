let records = [];

let fn_save = async (ctx, next) => {
    let key = ctx.request.body.key;
    let value = ctx.request.body.value;
    let result = records.find((e) => {
        return e.key === key;
    })
    if (result) {
        ctx.response.status = 200;
        let index = records.indexOf(result);
        records[index].value = value;
    } else {
        ctx.response.status = 200;
        records.push({
            key: key,
            value: value
        });
    }
    
};

let fn_fetch = async (ctx, next) => {
    let key = ctx.request.query.key;
    let result = records.find((e) => {
        return e.key === key;
    })
    if (result) {
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = {
            value: result.value
        }
    } else {
        ctx.response.status = 404;
    }
};

let fn_remove = async (ctx, next) => {
    let key = ctx.request.query.key;
    let result = records.find((e) => {
        return e.key === key;
    })
    if (result) {
        ctx.response.status = 200;
        let index = records.indexOf(result);
        records.slice(index, 1);
    } else {
        ctx.response.status = 404;
    }
};

module.exports = {
    'POST /api/pair': fn_save,
    'GET /api/pair': fn_fetch,
    'DELETE /api/pair': fn_remove
}