var mustacheLib = require('/lib/xp/mustache');
var router = require('/lib/router')();

var urlLib = require("/lib/url");

var mainTemplate = resolve("main.html");
var manifestTemplate = resolve("manifest.json");
var swTemplate = resolve("sw.js");

router.get('/', function (req) {
    var appUrl = urlLib.getAppUrl();
    var baseUrl = urlLib.getBaseUrl();
    return {
        body: mustacheLib.render(mainTemplate, {
            appUrl: appUrl,
            baseUrl: baseUrl
        }),
        contentType: 'text/html'
    };  
});

router.get('/manifest.json', function () {
    var appUrl = urlLib.getAppUrl();
    return {
        body: mustacheLib.render(manifestTemplate, {
            appUrl: appUrl
        }),
        contentType: 'text/html'
    };
});

router.get('/sw.js', function () {
    var baseUrl = urlLib.getBaseUrl();
    return {
        headers: {
            'Service-Worker-Allowed': baseUrl
        },
        body: mustacheLib.render(swTemplate, {
            appUrl: baseUrl
        }),
        contentType: 'application/javascript'
    };
});

exports.get = function (req) {
    return router.dispatch(req);
};

