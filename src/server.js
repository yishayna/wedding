
var common = require("./common");
var http = require('http');

http.createServer(function (req, res) {
    for (var matcher of common.matchers) {
        if (req.url.startsWith(matcher.uriPrefix)) {
            matcher.callback(res)
            return;
        }
    }
    
    // reach here only if there is no match
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("link not found");
    res.end();
}).listen(process.env.PORT || 80);
