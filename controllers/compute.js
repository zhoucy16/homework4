function fn_add(firstParam, secondParam) {
    return Number(firstParam + secondParam);
}

function fn_sub(firstParam, secondParam) {
    return Number(firstParam - secondParam);
}

function fn_mul(firstParam, secondParam) {
    return Number(firstParam * secondParam);
}

function fn_div(firstParam, secondParam) {
    return parseInt(firstParam / secondParam);
}

let fn_compute = async (ctx, next) => {
    let firstParam = Number(ctx.request.query.firstParam);
    let secondParam = Number(ctx.request.query.secondParam);
    let type = ctx.request.query.type;
    let result = 0;
    let result_exist = true;
    switch (type) {
        case 'ADD':
        result = fn_add(firstParam, secondParam);
        break;
        case 'SUB':
        result = fn_sub(firstParam, secondParam);
        break;
        case 'MUL':
        result = fn_mul(firstParam, secondParam);
        break;
        case 'DIV':
        result = fn_div(firstParam, secondParam);
        break;
        default:
        exist = false;
        break;
    }
    if (result_exist) {
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = {
            ans: result
        }
    } else {
        ctx.response.status = 403;
    }
};

module.exports = {
    'GET /api/compute': fn_compute
};

