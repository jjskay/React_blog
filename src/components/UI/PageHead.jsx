var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');
var { IntlMixin, FormattedMessage } = ReactIntl;
var {Menu, MenuItem, MenuDivider, Avatar, AppBar, RaisedButton, FontIcon} = require('material-ui/lib');

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var PageHead = React.createClass({
	contextTypes: {
		router: React.PropTypes.func.isRequired,
		muiTheme: React.PropTypes.object,
	},

	mixins: [IntlMixin,FluxibleMixin],

	statics: {
		storeListeners: [AuthStore]
	},

	getInitialState: function(){
		return this.getStateFromStores();

	},

	getStateFromStores: function(){
		// <AppBar title="My AppBar" />
  //       		<RaisedButton label="My Button" primary={true} />
		return {
			user: this.getStore(AuthStore).getUser(),
			inserStatus: this.getStore(AuthStore).getInsertStatus(),
			muiTheme: this.getStore(AuthStore).getInsertStatus(),
		}
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
		var data = {
			color: '#666',
		    hoverColor: "red",
		    onMouseLeave: function(){console.log("Leave");},
		    onMouseEnter: function(){console.log("Enter");},
		    style: {width:100}
		}
        return (
        	<div><FontIcon className="muidocs-icon-action-home" {...data}/></div>
        )
	},
})


module.exports = PageHead;






























