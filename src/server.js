require('./polyfills');
require('babel/register');

var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var serialize = require('serialize-javascript');
var csrf = require('csurf');
var cors = require('cors');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var fetchData = require('./utils/fetchData');
var app = require("./app");
var CustomFluxibleComponent = require('./components/CustomFluxibleComponent');
var provideContext = require('fluxible/addons/provideContext');
var AuthActions = require('./actions/AuthActions');

var api = require('./services');
var HtmlComponent = React.createFactory(require('./components/Html'));
var config = require('./configs');
var assets = require('./utils/assets');
var server = express();
var useragent = require('express-useragent');

var customContextTypes = {
	config: React.PropTypes.object,
}

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(favicon(__dirname + '/public/img/favicon.ico'));
server.use(cors());
server.use(csrf({cookie: true}));

server.use(session(
    {
    	secret: 'secret',
        key:'uId',
        resave: false,
        saveUninitialized: false,
        cookie: {secure: true}
    }
))

server.use(express.static(path.join(__dirname, 'public')));

var fetchrPlugin = app.getPlugin('FetchrPlugin');

fetchrPlugin.registerService(api.user)


server.use(useragent.express());

server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function(req, res, next){

	var context = app.createContext({
		req: req,
		res: res,
		config: config,
		xhrContext: {
			 _csrf: req.csrfToken(),
		}
	});
	context.getActionContext().executeAction(AuthActions.LoadSession, {}, function(){
        var router = Router.create({
			routes: routes,
			location: req.path,
			transitionContext: context,
			onAbort: function(redirect){
				return res.redirect(303, redirect.to);
			},
			onError: function(err){
				return next(err);
			}
		});

        router.run(function(Handler, routerState){
        	fetchData(context, routerState, function(err){
        		if(err){
        			console.log(err);
        			return res.render('error', {status: 500, stack: err});
        		}
        		var exposed = 'window.__DATA__=' + serialize(app.dehydrate(context));

                var markup = React.renderToString(React.createElement(
                    CustomFluxibleComponent,
                    {context: context.getComponentContext()},
                    React.createElement(Handler)
                ));
                var doctype = '<!DOCTYPE html>',html;

                if(routerState.routes[0].name === 'not-found'){
                	html = React.renderToStaticMarkup(React.createElement(Handler));
                }else{
                	html = React.renderToStaticMarkup(HtmlComponent({
                		assets: assets,
                		exposed: exposed,
                		context: context.getComponentContext(),
                		markup: markup
                	}));
                }
                res.send(doctype + html);
        	})
        })

	})
})

module.exports = server;






















