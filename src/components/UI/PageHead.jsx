var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');
var { IntlMixin, FormattedMessage } = ReactIntl;

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var PageHead = React.createClass({

	mixins: [IntlMixin,FluxibleMixin],

	propTypes: {
       val: React.PropTypes.string
	},

	statics: {
		storeListeners: [AuthStore]
	},

	getInitialState: function(){
		return this.getStateFromStores();

	},

	getDefaultProps() {
        return {
            val: '22222222222',
        };
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
        	<div>{this.props.val}</div>
        )
	},
})


module.exports = PageHead;






























