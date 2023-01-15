var common = require("./common");
var http = require('http');

http.createServer(function (req, res) {

    if (req.url in common.matchers){
        common.matchers[req.url](res)
        return;
    } else {
        var htmlTemplate =
        `<html>
            <head>
                <meta charset="utf-8" />
                <title> שירל וישי מתחתנים </title>\
                <link rel="icon" type="images/x-icon" href="https://cdn-icons-png.flaticon.com/512/3074/3074076.png" />
            </head>

            <body>
               <div style="position: relative; width: 100%; height: 0; padding-top: 177.7778%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">
                  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
                    src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFXrizGz4k&#x2F;view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
                  </iframe>
               </div>
                <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFXrizGz4k&#x2F;view?utm_content=DAFXrizGz4k&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">
            </body>
        </html>`;

        res.writeHead(200,  { 'Content-Type': 'text/html' });
        res.end(htmlTemplate);
    }
}).listen(process.env.PORT || 8080);
