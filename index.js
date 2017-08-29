const koa = require("koa");
const logger = require("koa-logger");
const static = require("koa-static");
const router = require('koa-router')();
const bodyparser = require("koa-body")();
const path = require("path");
const http = require("http");
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

router.post("/imgdata64", bodyparser, async(ctx, next) => {
    ctx.body = JSON.parse(ctx.request.body);

    ctx.response.body = await new Promise(function(resole, reject) {
        http.get(ctx.body.cover, function(res) {
            var chunks = [];
            var size = 0;
            var data = "";
            res.on("data", function(chunk) {
                chunks.push(chunk);
                size += chunk.length;
            })
            res.on("end", function() {
                data = Buffer.concat(chunks, size);
                var info = new Object();
                info.character_id = ctx.body.character_id;
                info.cover = data.toString("base64");
                resole(JSON.stringify(info));
            });
        });

    }).then(function(value) {
        return value;
    }, function(err) {});;

});

router.get("/favicon.ico", async(ctx, next) => {
    return;
});

//app.use(bodyparser());
app.use(router.routes());

app.listen(port);