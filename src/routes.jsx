var React = require('react');
var Router = require('react-router');

var { Route, DefaultRoute, NotFoundRoute, Redirect } = Router;

var App = require('./components/App');
var Home = require('./components/UI/Home');
var NotFound = require('./components/NotFound');
var PageHead =  require('./components/UI/PageHead');
var Add = require('./components/UI/Add');

var routes = (
         <Route name="app" handler={App} path="/">
             <DefaultRoute name="default" handler={Home}/>
             <Route name="add" handler={Add} path="/add" />
             <NotFoundRoute handler={NotFound} name="not-found" />
         </Route>
	)

module.exports = routes;
























