const koa = require("koa");
const logger = require("koa-logger");
const static = require("koa-static");
const router = require('koa-router')();
const path = require("path");
const fs = require("fs");
const data = require("./data/data");
const views = "./views/";
const port = 3000;

const app = new koa();

app.use(logger());
app.use(static(path.join(__dirname, '/')));

router.get('/', async(ctx, next) => {

    var html = fs.readFileSync(views + "index.html", "utf8", async(err, data) => {
        html = data;
    });

    ctx.response.body = html;
});

router.post('/data', async(ctx, next) => {
    var html = "";
    ctx.response.body = await new Promise(function(resole, reject) {
        data(function(data) {
            if (data) {
                resole(data)
            }
        })
    }).then(function(value) {
        return value;
    }, function(err) {});
});

router.get("/favicon.ico", async(ctx, next) => {
    return;
});

app.use(router.routes());

app.listen(port);