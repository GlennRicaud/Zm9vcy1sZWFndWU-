var mustacheLib = require('/lib/xp/mustache');
var portalLib = require('/lib/xp/portal');
var router = require('/lib/router')();
var view = resolve("main.html");

router.get('/', function (req) {
    var appUrl = portalLib.url({path:'/app/systems.rcd.enonic.foosleague'});
    var baseUrl = endWithSlash(appUrl) ? appUrl.substring(0, appUrl.length - 1) : appUrl;
    var body = mustacheLib.render(view, {
        appUrl: appUrl,
        baseUrl: baseUrl
    });

    return {
        body: body,
        contentType: 'text/html'
    };  
});

exports.get = function (req) {
    return router.dispatch(req);
};

function endWithSlash(url) {
    return url.charAt(url.length - 1) === '/';
}