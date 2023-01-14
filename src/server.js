
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
   

    for (var matcher of common.matchers) {
        if (req.url.startsWith(matcher.uriPrefix)) {
            matcher.callback()
        }
    }
}).listen(process.env.PORT || 80);
