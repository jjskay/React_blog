var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var {IntlMixin,FormattedMessage} = require('react-intl');
var {concurrent} = require('contra');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');

var {AuthMixin} = require('../../mixins')

var _ = require('lodash');
var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');
var ListActions = require('../../actions/ListActions');
var ListStore = require('../../stores/ListStore');


var {UserIndex, PulicIndex, } = require('./IndexPage');
var PageHead = require('./PageHead')
var {ConfirmBox, LoadBox} = require('./utilsUI');

var Home = React.createClass({

	mixins: [IntlMixin, FluxibleMixin],

	statics: {
		storeListeners: [AuthStore, ListStore],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, AuthActions.LoadSession, {}),
            ],function(){
                concurrent([
                   context.executeAction.bind(context, ListActions.GetAtricleList , {})
                   ],done)
            })
        }
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			user: this.getStore(AuthStore).isLoginCookie(),
            menuStatus: false,
            messageStatus: this.getStore(ListStore).getConfirmBoxStatus(),
            addModule: false,
            categoryIndex: this.getStore(AuthStore).getCategoryIndex(),
            categoryVisiable: this.getStore(ListStore).getCategoryVisiable(),
            addCategroyError: this.getStore(ListStore).getAddCategroyError(),
            articlesList: this.getStore(ListStore).getArticles(),
            loadStatus: this.getStore(ListStore).getLoadStatus(),
		}
	},

	onChange: function(){
        this.setState(this.getStateFromStores());
	},

    onchangeLoginStatus: function(){
        this.context.executeAction(AuthActions.LoadSession, {})
    },

    articleDelete: function(id,categoryId,createTime){
        this.deleteId = id;
        this.categoryId = categoryId;
        this.createTime = createTime;
        this.context.executeAction(ListActions.ConfirmBoxShow, {bool:true})
    },

    onclickBoxSure: function(){
        this.context.executeAction(ListActions.DeteleArticle, {id:this.deleteId,categoryId:this.categoryId,createTime:this.createTime});
    },

    onclickBoxCancel: function(){
        this.context.executeAction(ListActions.ConfirmBoxShow, {bool:false})
    },

    addModuleShow: function(){
        this.setState({addModule: !this.state.addModule})
    },

    sginOut: function(){
        this.context.executeAction(AuthActions.LogOut, {})
    },

    deleteCategory: function(categoryId, categoryNum){
        this.context.executeAction(ListActions.DeleteCategory, {id:categoryId});
    },

    getcategoryList: function(id){
        this.context.executeAction(AuthActions.CategoryIndexChange, {id:id});
    },

    returnArticlesList: function(){
        var id = this.state.categoryIndex;
        var arr = this.state.articlesList;
        var returnArr;
        if(id == 0){
            returnArr = arr;
        }else{
            returnArr = [];
            arr && arr.length !== 0 && arr.map((val,index) => {
                if(val.categoryId == id){
                    returnArr.push(val);
                }
            })
        }
        typeof window !== 'undefined' && window.sessionStorage
        && this.state.articlesList ?
        window.sessionStorage.list =
        JSON.stringify(this.state.articlesList) : '';
        return returnArr;
    },

    render: function(){
		var ele;
        var head;
        if(this.state.user){
            ele = <UserIndex
                  menuStatus={this.state.menuStatus}
                  user={this.state.user}
                  articleDelete={this.articleDelete}
                  addModule={this.state.addModule}
                  addModuleShow={this.addModuleShow}
                  categoryIndex={this.state.categoryIndex}
                  deleteCategory={this.deleteCategory}
                  addCategory={this.addCategory}
                  categoryVisiable={this.state.categoryVisiable}
                  addCategroyError={this.state.addCategroyError}
                  addCategoryClose={this.addCategoryShow}
                  addCategoryShow={this.addCategoryShow}
                  articlesList={this.returnArticlesList()}
                  getcategoryList={this.getcategoryList}/>;
            head = <PageHead sginOut={this.sginOut} />;
        }else{
            ele = <PulicIndex loginStatusFunc={this.onchangeLoginStatus} />;
        }
        return (
            <div id="layout">
                {head}
                {ele}
                <ConfirmBox messageStatus={this.state.messageStatus} onclickBoxSure={this.onclickBoxSure} onclickBoxCancel={this.onclickBoxCancel}  />
                <LoadBox loadStatus={this.state.loadStatus} />
            </div>
        )
	},

    addCategory: function(val){
        if(val && val.length > 1){
            this.context.executeAction(ListActions.AddCategoryApi, {val:val});
        }else{
            this.context.executeAction(ListActions.AddCategoryError, {val:'Category name at least two characters!'});
        }
    },

    addCategoryShow: function(val){
        this.context.executeAction(ListActions.AddCategoryShow, {val:val});
    }
})


module.exports = Home;






























