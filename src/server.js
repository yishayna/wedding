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
                <style>
                    background-image: url("https://syweddingstorage.blob.core.windows.net/mystore/invitation.jpg");
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
                        background-size: cover
                    }
                </style>
            </head>

            <body>
                <img class="center fit" src="https://syweddingstorage.blob.core.windows.net/mystore/invitation.jpg" usemap="#image-map">

                <map name="image-map">
                    <area target="" alt="navigate" title="navigate" href="/navigate" coords="38,1631,342,1801" shape="rect">
                    <area target="" alt="gift" title="gift" href="/gift" coords="691,1807,389,1631" shape="rect">
                    <area target="" alt="" title="" href="" coords="749,1803,1050,1633" shape="rect">
                </map>
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
