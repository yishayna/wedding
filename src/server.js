
var common = require("./common");
var http = require('http');
var util = require('util');

http.createServer(function (req, res) {
    for (var matcher of common.matchers) {
        if (req.url.startsWith(matcher.uriPrefix)) {
            matcher.callback(res)
        }
    }
}).listen(process.env.PORT || 80);
