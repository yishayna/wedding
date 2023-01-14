
var common = require("./common");
var http = require('http');
var util = require('util');

http.createServer(function (req, res) {
    var htmlTemplate =
        '<html> \
            <head> \
                <meta name="redirect" content="weddinglinkresolver.azurewebsites.net%s %s %s"> \
                <meta http-equiv="refresh" content="0;URL=\'%s\'" /> \
            </head> \
            <body> \
                <p>This link you are looking for is <a href="%s"> here</a>. \
                </p> \
            </body> \
        </html> \
        ';
   
    var matched = false;
    var callback = null;

    for (var matcher of common.matchers) {
        if (req.url.startsWith(matcher.uriPrefix)) {
            uriPrefix = matcher.uriPrefix;
            proto = matcher.proto;
            linkPath = matcher.linkPath;
            callback = matcher.callback
            matched = true
            break;
        }
    }
    if (matched == true) {
        callback()
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("link not found");
        res.end();
    }
}).listen(process.env.PORT || 80);
