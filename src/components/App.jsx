var React = require('react');
var Router = require('react-router');
var {
  Route, RouteHandler, Link
} = Router;
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');

var App = React.createClass({

  mixins: [FluxibleMixin],

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
  },
  // getChildContext: function () {
  //       return {
  //           muiTheme: ThemeManager.getMuiTheme(HeadStyle)
  //       };
  // },

  // childContextTypes: {
  //       muiTheme: React.PropTypes.object

  // },

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