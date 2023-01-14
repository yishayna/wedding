// this is to verify the mapping indeed take effects
var common = require("./common");
const util = require('util');
const https = require('https');

const getContent = function (url) {
    return new Promise((resolve, reject) => {
        console.log(util.format("will request: %s", url));
        const request = https.get(url, (response) => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => resolve(body.join('')));
        });
        // handle connection errors of the request
        request.on('error', (err) => reject(err))
    })
}

async function verify(baseURL, matcher) {
    console.log(util.format("matching item: %s to %s", matcher.uriPrefix, matcher.linkPath));
    goPKG = util.format("%s%s", baseURL, matcher.uriPrefix);

    try {
        var responseBody = await getContent(goPKG);
        if (!responseBody.includes(matcher.linkPath)) {
            throw new Error(util.format("link Path: %s is not found in body", matcher.linkPath));
        } else {
            console.log("matches!");
        }
    } catch (e) {
        console.log("got one error:");
        console.dir(e);
        throw e;
    }
};

async function verifyAll(baseURL) {
    for (var matcher of common.matchers) {
        await verify(baseURL, matcher)
    }
}

baseURL = process.argv[2];

verifyAll(baseURL).catch(function () {
    process.exit(1);
});