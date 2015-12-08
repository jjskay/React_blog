var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');
var { IntlMixin, FormattedMessage } = ReactIntl;
var {Menu, MenuItem, MenuDivider, Avatar, AppBar, RaisedButton} = require('material-ui/lib');

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var PageHead = React.createClass({
	contextTypes: {
		router: React.PropTypes.func.isRequired
	},

	mixins: [IntlMixin,FluxibleMixin],

	statics: {
		storeListeners: [AuthStore]
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			user: this.getStore(AuthStore).getUser(),
			inserStatus: this.getStore(AuthStore).getInsertStatus()
		}
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
        return (
			<div>
                <AppBar title="My AppBar" />
        		<RaisedButton label="My Button" primary={true} />
			</div>
        )
	},
})


module.exports = PageHead;






























