const Koa = require('koa');

const koaBetterBody = require('koa-better-body');

const controller = require('./controller');

const app = new Koa();

const mytoken = '9d6eeaf8c7ec2aeff3c9cff5a1f5f14b1f90d4e0';

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    if (ctx.request.header['hw-token'] === mytoken) {
        await next();
    } else {
        ctx.response.status = 403;
    }
});

app.use(koaBetterBody({
    fields: 'body'
}));

app.use(controller());

app.listen(12306);
console.log('app started at port 12306...');