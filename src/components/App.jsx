var React = require('react');
var Router = require('react-router');
var {
  Route, RouteHandler, Link
} = Router;
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var PageHear = require('./UI/PageHead')

var App = React.createClass({

  mixins: [FluxibleMixin],

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  },

  onChange: function() {
    return;
  },

  render: function() {
    return (
      <div className="body">
               <RouteHandler />
           </div>
    )
  }
})


module.exports = App;