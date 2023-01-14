
var common = require("./common");
var http = require('http');
var util = require('util');

http.createServer(function (req, res) {

    if (req.url in common.matchers){
        common.matchers[req.url](res)
        return;
    } else {
        var htmlTemplate =
            '<html> \
                <head>\
                    <meta charset="utf-8" />\
                    <title> שירל וישי מתחתנים </title>\
                    <link rel="icon" type="images/x-icon" href="https://cdn-icons-png.flaticon.com/512/3074/3074076.png" />\
                </head>\

                <body>\
                <h1> <img src="https://syweddingstorage.blob.core.windows.net/mystore/invitation.jpg"> </h1>\
                </body>\

            </html> \
            ';
        
        res.writeHead(200,  { 'Content-Type': 'text/html' });
        res.end(htmlTemplate);
        }
    }  

}).listen(process.env.PORT || 8080);
