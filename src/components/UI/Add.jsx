var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var {IntlMixin,FormattedMessage} = require('react-intl');
var {concurrent} = require('contra');
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';

var {CategorySelector, LoadBox} = require('./utilsUI');
var ReactIntl = require('react-intl');

var {AuthMixin} = require('../../mixins')

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');
var ListActions = require('../../actions/ListActions');
var ListStore = require('../../stores/ListStore');

var PageHead = require('./PageHead');
var AuthMixins = require('../../utils/AuthMixins');

var Home = React.createClass({

	mixins: [State, Navigation, FluxibleMixin, IntlMixin, AuthMixin],

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
            categoryList: this.getStore(AuthStore).isLoginCookie(),
            categorySelected: this.getStore(ListStore).getCategorySelected(),
            addError: this.getStore(ListStore).getArticleError(),
            loadStatus: this.getStore(ListStore).getLoadStatus(),
		}
	},

	onChange: function(){
		if(!this.getStore(AuthStore).isLoginCookie()){
			this.transitionTo('/');
		}else{
			this.setState(this.getStateFromStores());
		}
	},

    sginOut: function(){
        this.context.executeAction(AuthActions.LogOut, {})
    },

    categorySelectFunc: function(bool){
        this.context.executeAction(ListActions.categorySelectChange, {bool:bool,name:'',id:''})
    },

    categoryGetVal: function(id, categoryName){
        this.context.executeAction(ListActions.categorySelectChange, {bool:true,name:categoryName,id:id})
    },

    returnError: function(){
        if(this.state.addError){
        	return <p className="atricle-err">{this.state.addError}</p>;
        }
    },

    render: function(){
        return (
            <div id="layout">
                <PageHead sginOut={this.sginOut} />
                <div className="add-content">
                     <div>
                         <label>Title:<input ref="addTitle" type="text" placeholder="Please enter titele!"/></label>
                     </div>
                     <div>
                         <span className="fl">Category:</span>
                         <CategorySelector
                         categoryList={this.state.categoryList}
                         categorySelectFunc={this.categorySelectFunc}
                         categorySelected={this.state.categorySelected}
                         categoryGetVal={this.categoryGetVal}/>
                     </div>
                     <div className="add-conetnt-body">
                         <label className="fl">Content:</label>
                         <textarea ref="addContent"></textarea>
                     </div>
                     {this.returnError()}
                     <p><span className="fl" onClick={this.submit}>Submit</span><Link className="fr" to="/">Back</Link></p>
                </div>
                <LoadBox loadStatus={this.state.loadStatus} />
            </div>
        )
	},

	submit: function(){
		var title = React.findDOMNode(this.refs.addTitle).value.replace(/(^\s+)|(\s+$)/g, "");
		var content = React.findDOMNode(this.refs.addContent).value.replace(/(^\s+)|(\s+$)/g, "");
        var categoryId = this.state.categorySelected.id;
        var t = false, c = false, s = false;

        title.length > 0 ? t = true : t = false;
        content.length > 0 ? c = true : c = false;
        categoryId ? s = true : s = false;
        var error;
        if(!t){
        	error = 'Please enter title!'
        }else if(t && !s){
        	error = 'Please select category!'
        }else if(t && s && !c){
        	error = 'Please enter content!'
        }
        if(t && s && c){
        	var obj = {};
        	obj.title = title;
        	obj.content = content;
        	obj.categoryId = categoryId;
        	obj.username = this.state.categoryList.username;
        	obj.createTime = new Date().getTime();
            obj.categoryName = this.state.categorySelected.name;
        	this.context.executeAction(ListActions.AddArticle,{obj:obj});
        }else{
        	this.context.executeAction(ListActions.SubmitError,{error:error});
        }
	}

})


module.exports = Home;






























