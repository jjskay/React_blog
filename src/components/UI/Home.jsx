var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var {IntlMixin,FormattedMessage} = require('react-intl');
var {concurrent} = require('contra');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');

var {AuthMixin} = require('../../mixins')

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var {UserIndex, PulicIndex} = require('./IndexPage');
var PageHead = require('./PageHead')

var Home = React.createClass({

	mixins: [IntlMixin, FluxibleMixin],

	statics: {
		storeListeners: [AuthStore],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, AuthActions.LoadSession, {})
            ], done)
        }
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			isLoginCookie: this.getStore(AuthStore).isLoginCookie()
		}
	},

	onChange: function(){
        this.setState(this.getStateFromStores());
	},

    onchangeLoginStatus: function(){
        this.context.executeAction.bind(context, AuthActions.LoadSession, {})
    },

	render: function(){
		var ele;
        var head;
        if(this.state.isLoginCookie){
            ele = <UserIndex />;
            head = <PageHead />;
        }else{
            ele = <PulicIndex loginStatusFunc={this.onchangeLoginStatus} />;
        }
        return (
            <div id="layout">
                {head}
                {ele}
            </div>
        )
	}
})


module.exports = Home;






























