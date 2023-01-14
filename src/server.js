
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
    var uriPrefix = "";
    var proto = "";
    var linkPath = "";
    var matched = false

    for (var matcher of common.matchers) {
        if (req.url.startsWith(matcher.uriPrefix)) {
            uriPrefix = matcher.uriPrefix;
            proto = matcher.proto;
            linkPath = matcher.linkPath;
            matched = true
            break;
        }
    }
    if (matched == true) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(util.format(htmlTemplate, uriPrefix, proto, linkPath, linkPath, linkPath));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("link not found");
        res.end();
    }
}).listen(process.env.PORT || 80);
