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
                <title> שירל וישי מתחתנים </title>
                <link rel="icon" type="images/x-icon" href="https://cdn-icons-png.flaticon.com/512/3074/3074076.png" />
                
                <style>
                    * {
                        padding: 0;
                        margin: 0;
                    }
                    .fit { /* set relative picture size */
                        max-width: 100%;
                        max-height: 100%;
                    }
                    .center {
                        display: block;
                        margin: auto;
                    }
                </style>
                
            </head>

            <body>
                <img class="center fit" src="https://syweddingstorage.blob.core.windows.net/mystore/invitation.jpg" >
                <script src="http://code.jquery.com/jquery-latest.js">
                <script type="text/javascript" language="JavaScript">
                    function set_body_height() { // set body height = window height
                        $('body').height($(window).height());
                    }
                    $(document).ready(function() {
                        $(window).bind('resize', set_body_height);
                        set_body_height();
                    });
                </script>
            </body>
        </html>`;

        res.writeHead(200,  { 'Content-Type': 'text/html' });
        res.end(htmlTemplate);
    }
}).listen(process.env.PORT || 8080);
