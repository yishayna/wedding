var util = require('util');
var fs = require("fs");

function redirect(uriPrefix, proto, linkPath) {

    var htmlTemplate =
    '<html> \
        <head> \
            <meta name="redirect" content="wedding-link-resolver.azurewebsites.net%s %s %s"> \
            <meta http-equiv="refresh" content="0;URL=\'%s\'" /> \
        </head> \
        <body> \
            <p>This link you are looking for is <a href="%s"> here</a>. \
            </p> \
        </body> \
    </html> \
    ';

    return (res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(util.format(htmlTemplate, uriPrefix, proto, linkPath, linkPath, linkPath));
    }
}

function renderInvitation() {

    return (res) => {
        res.writeHead(200, 
            { 'Content-Type': 'image/png' }
            );

        fs.readFile("invitation.png",
            function (err, content) {
                // Serving the image
                res.end(content);
        });
    
    }
}

var matchers = {
    '/gift': redirect(
        "/gift",
        "PayBox",
        "https://payboxapp.page.link/?link=http://pbme.co/?v%3Dj%26g%3D63c183c483853700087aba53&apn=com.payboxapp&afl=http://pbme.co/?v%3Dj%26g%3D63c183c483853700087aba53&ibi=com.payboxapp.paybox&ifl=http://pbme.co/?v%3Dj%26g%3D63c183c483853700087aba53&cid=2042653307573259374&_osl=https://payboxapp.page.link/r4mqH9bk82XSVyfz8&_icp=1"
        ),
    '/invite': renderInvitation(),
    '/navigate': redirect(
        "/navigate",
        "Waze",
        "https://ul.waze.com/ul?preview_venue_id=23068990.230624364.21299&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"         
    ),
};

module.exports = {
    matchers: matchers
}

