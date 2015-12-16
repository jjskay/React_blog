var React = require('react');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var {IntlMixin,FormattedMessage} = require('react-intl');

var AuthStore = require('../../../stores/AuthStore');
var ListActions = require('../../../actions/ListActions');
var ListStore = require('../../../stores/ListStore');

var FontIcon = require('../utilsUI/FontIcon')

var FluxibleMixin = require('fluxible/addons/FluxibleMixin');

var UserIndex = React.createClass({

	prpoTypes: {
		isLogin: React.PropTypes.bool
	},

	mixins: [FluxibleMixin, IntlMixin],

	statics: {
		storeListeners: [AuthStore, ListStore],
		fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, ListActions.GetList, {})
            ])
		}
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			isLogin: this.getStore(AuthStore).isLoginCookie(),
			list: this.getStore(ListStore).getList(),
			menuStatus: false,
		}
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
        return (
           <div className="user-content">
                {this.listRender()}
                {this.userInfoRender()}
           		<p onClick={this.getUser}>This is UserIndex.</p>
           </div>
        )
	},

	getUser: function(){
		this.context.executeAction(ListActions.GetList, {})
	},

	listRender: function(){
		var views;
		if(this.state.list.length > 0){
			views = (
               <div className="user-content-list"></div>
			)
		}
	},

	userInfoRender: function(){
		var data = {
			username:'18888888',
			userNavList:[
               {title:'文章',iconClass:'icon-search',num:3},
               {title:'文章',iconClass:'icon-search',num:3},
               {title:'文章',iconClass:'icon-search',num:3},
               {title:'文章',iconClass:'icon-search',num:3},
			]
		}
		return (
             <div className="user-content-nav">
                 <div className="user-name">
                     <span>{data.username}<span>
                     <span className="menu" onClick={this.addModule}>
                     	<b></b>
                        <div>
                            <Link to="/">
                                 <FontIcon iconClass="icon-add" iconColor="blank" />
                                 新建分类
                            </Link>
                        </div>
                     <span>
                 </div>
                 <div className="user-nav-list">
                     {
                     	data.userNavList.map((value, index) => {
                     		return (
                     					<div>
                     					    <FontIcon  iconClass={vaule.iconClass} iconColor="blank" />
                     						{value.title}
                     						<i>{value.num}</i>
                     					</div>
                     		)
                     	})
                     }
                 </div>
             <div>
		)
	}

})


module.exports = UserIndex;