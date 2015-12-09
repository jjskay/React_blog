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

    contextTypes: {
        executeAction: React.PropTypes.func,
    },

	statics: {
		storeListeners: [AuthStore],
        // fetchData: function(context, params, query, done){
        //     concurrent([
        //         context.executeAction.bind(context, AuthActions.LoadSession, {})
        //     ])
        // }
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

	render: function(){
		var ele;
        var head;
        var data = {val:"333333"}
        if(this.state.isLoginCookie){
            ele = <UserIndex />;
            head = <PageHead {...data} />;
        }else{
            ele = <PulicIndex />;
        }
        return (
            <div id="layout">
                {head}
                {ele}
                <span onClick={this.getLoginStatus}>Go</span>
            </div>
        )
	},

    getLoginStatus: function(){
        this.context.executeAction(AuthActions.LoadSession, {})
    }
})


module.exports = Home;






























