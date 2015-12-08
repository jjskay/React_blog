var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: require('./routes')
});

app.plug(fetchrPlugin({
    xhrPath: '/api',
    xhrTimeout: 10000
}))

app.plug(require('./plugins/cookie'));
app.plug(require('./plugins/router')());
app.plug(require('./plugins/sessionStorage'));

app.registerStore(require('./stores/AuthStore'));

module.exports = app;

























