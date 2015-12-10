var React = require('react');
var Router = require('react-router');

var { Route, DefaultRoute, NotFoundRoute, Redirect } = Router;

var App = require('./components/App');
var Home = require('./components/UI/Home');
var NotFound = require('./components/NotFound');
var PageHead =  require('./components/UI/PageHead');

var routes = (
         <Route name="app" handler={App} path="/">
             <DefaultRoute name="default" handler={Home}/>
             <Route name="pagehead" handler={PageHead} path="/pagehead" />
             <NotFoundRoute handler={NotFound} name="not-found" />
         </Route>
	)

module.exports = routes;
























