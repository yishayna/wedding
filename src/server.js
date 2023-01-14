
var common = require("./common");
var http = require('http');
var util = require('util');

http.createServer(function (req, res) {

    if (req.url in common.matchers){
        common.matchers[req.url](res)
        return;
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("link not found");
        res.end();
    }  

}).listen(process.env.PORT || 8080);
