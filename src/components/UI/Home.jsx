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
var ListActions = require('../../actions/ListActions');
var ListStore = require('../../stores/ListStore');


var {UserIndex, PulicIndex} = require('./IndexPage');
var PageHead = require('./PageHead')

var Home = React.createClass({

	mixins: [IntlMixin, FluxibleMixin],

	statics: {
		storeListeners: [AuthStore, ListStore],
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
			user: this.getStore(AuthStore).isLoginCookie(),
            menuStatus: false,
            messageStatus: false,
            addModule: false
		}
	},

	onChange: function(){
        this.setState(this.getStateFromStores());
	},

    onchangeLoginStatus: function(){
        this.context.executeAction.bind(context, AuthActions.LoadSession, {})
    },

    articleDelete: function(id){
        this.context.executeAction.bind(context, ListActions.detele, {id:id})
    },

    onclickBoxSure: function(){

    },

    onclickBoxCancel: function(){

    },

    addModuleShow: function(){
        this.setState({addModule: !this.state.addModule})
    },

	render: function(){
		var ele;
        var head;
        if(this.state.user){
            ele = <UserIndex menuStatus={this.state.menuStatus} user={this.state.user} articleDelete={this.articleDelete} addModule={this.state.addModule} addModuleShow={this.addModuleShow}/>;
            head = <PageHead />;
        }else{
            ele = <PulicIndex loginStatusFunc={this.onchangeLoginStatus} />;
        }
        return (
            <div id="layout">
                {head}
                {ele}
                <confirmBox messageStatus={this.state.messageStatus} onclickBoxSure={this.onclickBoxSure} onclickBoxCancel={this.onclickBoxCancel}  />
            </div>
        )
	}
})


module.exports = Home;






























