var React = require('react');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var AuthStore = require('../../../stores/AuthStore');
var AuthActions = require('../../../actions/AuthActions');

import FluxibleMixin from 'fluxible/addons/FluxibleMixin';

var PulicIndex = React.createClass({

	prpoTypes: {
		isLogin: React.PropTypes.bool
	},

	statics: {
		storeListeners: [AuthStore]
	},

	mixins: [FluxibleMixin],

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			isLogin: this.getStore(AuthStore).isLoginCookie()
		}
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
        return (
           <p>This is Public.</p>
        )
	},

})


module.exports = PulicIndex;