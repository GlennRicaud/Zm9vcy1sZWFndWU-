var mustacheLib = require('/lib/xp/mustache');
var portalLib = require('/lib/xp/portal');
var router = require('/lib/router')();

var mainTemplate = resolve("main.html");
var manifestTemplate = resolve("manifest.json");

router.get('/', function (req) {
    var appUrl = getAppUrl();
    var baseUrl = endWithSlash(appUrl) ? appUrl.substring(0, appUrl.length - 1) : appUrl;
    var body = mustacheLib.render(mainTemplate, {
        appUrl: appUrl,
        baseUrl: baseUrl
    });

    return {
        body: body,
        contentType: 'text/html'
    };  
});

router.get('/manifest.json', function () {
    var appUrl = getAppUrl();
    var body = mustacheLib.render(manifestTemplate, {
        appUrl: appUrl
    });

    return {
        body: body,
        contentType: 'text/html'
    };
});

exports.get = function (req) {
    return router.dispatch(req);
};

function getAppUrl() {
    return portalLib.url({path:'/app/systems.rcd.enonic.foosleague'});
}

function endWithSlash(url) {
    return url.charAt(url.length - 1) === '/';
}