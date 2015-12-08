var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');
var { IntlMixin, FormattedMessage } = ReactIntl;

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');

var Home = React.createClass({
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
		var userList = '';
        if(this.state.user){
            userList = (
                <ul>
                    {
                    	this.state.user.map((v,i) => {
                    		return <li key={i}>{v.username}</li>
                    	})
                    }
                </ul>
            )
        }

		return(
            <div>
                <h3 onClick={this.getListMeta}>Header</h3>
                <p>
                   <label>user:</label><input type="text" ref="username" />
                   <button onClick={this.addUser}>插入</button>
                   {this.info}
                </p>
                <Link to="pagehead">Go</Link>
                {userList}
            </div>
		)
	},

    getListMeta: function(){
    	this.executeAction(AuthActions.getUser, {});
    },

    addUser: function(){
    	var _this = this;
    	var val = React.findDOMNode(this.refs.username).value.replace(/(^\s+)|(\s+$)/g, "");
    	this.info = '';
    	if(this.state.inserStatus){
    		if(val == ''){
	    		this.info = (<span>请输入用户名！</span>)
	    	}else{
	    		this.info = (<span>用户添加成功！</span>)
	    		_this.executeAction(AuthActions.getUser, {});
	    		React.findDOMNode(this.refs.username).value = '';
	    	}
    	}
    	this.executeAction(AuthActions.getInfo, {value:val});
    }
})


module.exports = Home;






























