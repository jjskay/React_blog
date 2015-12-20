var React = require('react');

var classSet = require('classnames');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var {IntlMixin,FormattedMessage} = require('react-intl');

var AuthActions = require('../../../actions/AuthActions');
var AuthStore = require('../../../stores/AuthStore');
var ListActions = require('../../../actions/ListActions');
var ListStore = require('../../../stores/ListStore');

var FilterData = require('../../../utils/filterData')

var {FontIcon, ArticleList} = require('../utilsUI/')

var FluxibleMixin = require('fluxible/addons/FluxibleMixin');

var UserIndex = React.createClass({

	prpoTypes: {
		menuStatus: React.PropTypes.bool,
		user: React.PropTypes.object,
		articleDelete: React.PropTypes.func,
        addModuleShow: React.PropTypes.func,
        addModule: React.PropTypes.bool
	},

	mixins: [FluxibleMixin, IntlMixin],

	render: function(){
        return (
           <div className="user-content">
                {this.listRender()}
                {this.userInfoRender()}
           </div>
        )
	},

	getUser: function(){
		this.context.executeAction(ListActions.GetList, {})
	},

	listRender: function(){
		var views;
		if(this.props.user && this.props.user.list.length > 0){
			views = (
               <div className="user-content-list">
                    <ArticleList list={this.props.user.list} articleDelete={this.articleDelete} />
               </div>
			)
		}else{
			views = (<div className="user-content-list"><span>IS NONE!</span></div>);
		}
		return views;
	},

	articleDelete: function(id){
        this.props.articleDelete(id);
	},

	userInfoRender: function(){
		var data = {
			username:'18888888',
			userNavList:[
               {title:'Note',iconClass:'icon-search',num:3,path:'/'},
               {title:'Note',iconClass:'icon-search',num:3,path:'/'},
               {title:'Note',iconClass:'icon-search',num:3,path:'/'},
               {title:'Note',iconClass:'icon-search',num:3,path:'/'},
			]
		}
		var menuClass = classSet({
			'menu':true,
			'active':this.props.addModule
		})


        var filter = new FilterData();
        console.log(filter.allList(this.props.user.list))
		return (
             <div className="user-content-nav">
                 <div className="user-name">
                     <span><i className="iconfont icon-user"></i>{this.props.user.username}</span>
                     <b onClick={this.addModuleShow}><i></i></b>
                     <div className={menuClass}>
                         <Link to="/">
                              <FontIcon iconClass="icon-add" iconColor="blank" />
                                 新建分类
                         </Link>
                     </div>
                 </div>
                 <div className="user-nav-list">
                     {
                     	data.userNavList.map((value, index) => {
                     		return (
                     				<Link key={index} to={value.path}>
                     					<FontIcon  iconClass={value.iconClass} iconColor="blank" />
                     					{value.title}
                     					<i>{value.num}</i>
                     				</Link>
                     		)
                     	})
                     }
                 </div>
             </div>
		)
	},

	addModuleShow: function(){
        this.context.executeAction(AuthActions.LoadSession,{})
        console.log(this.context)
        this.props.addModuleShow();
	}

})


module.exports = UserIndex;