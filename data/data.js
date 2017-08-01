const http = require("http");
const header = "http://bangumi.bilibili.com/moe/2017/2/api/schedule/audition_list?"
const src = ["sex=1&sort=1"];

var data = function(callback) {
    var _data = "";
    http.get(header + src[0], function(res) {
        res.setEncoding("utf-8");
        res.on("data", function(chunk) {
            _data += chunk;
        })
        res.on("end", function(res) {
            callback(_data);
        })
    });
}

module.exports = data;