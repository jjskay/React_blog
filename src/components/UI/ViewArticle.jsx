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

var ViewArticle = React.createClass({

	mixins: [FluxibleMixin, IntlMixin, AuthMixin],

	statics: {
		storeListeners: [AuthStore, ListStore],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, AuthActions.LoadSession, {})
            ], function () {
                concurrent([
                    context.executeAction.bind(context, ListActions.GetAtricleOnce , {createTime:params.createTime})
                ], done)
            })
        }
	},

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
            articleVal: this.getStore(ListStore).getAtricleOne(),
            categoryList: this.getStore(AuthStore).isLoginCookie(),
            loadStatus: this.getStore(ListStore).getLoadStatus(),
            articleTabobj: this.getStore(ListStore).getArticleTabobj(),
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

    atricleTab: function(){
    	 var prev, next, tab = this.state.articleTabobj;
    	 if(tab.prev){
    	 	prev = <Link className="fl" to="viewArticle" params={{createTime:tab.prev}}>Prev</Link>
    	 }
    	 if(tab.next){
    	 	next = <Link className="fr" to="viewArticle" params={{createTime:tab.next}} style={{marginLeft:20}}>Next</Link>
    	 }
         return (
             <p style={{width:'50%',margin:0,marginTop:'15px'}}>
                {prev}
                <Link className="fr" to="/" style={{marginLeft:20}}>List</Link>
                {next}
             </p>
         )
    },

    render: function(){
			var cTime = '';
            cTime+= new Date(this.state.articleVal.createTime).getFullYear();
            cTime+= '/';
            cTime+= (Number(new Date(this.state.articleVal.createTime).getMonth()) + 1) > 9 ? (Number(new Date(this.state.articleVal.createTime).getMonth()) + 1) : '0'+(Number(new Date(this.state.articleVal.createTime).getMonth()) + 1);
            cTime+='/';
            cTime+= new Date(this.state.articleVal.createTime).getDate() > 9 ? new Date(this.state.articleVal.createTime).getDate() : '0'+new Date(this.state.articleVal.createTime).getDate();
            cTime+= '    ';
            cTime+= new Date(this.state.articleVal.createTime).getHours() > 9 ? new Date(this.state.articleVal.createTime).getHours() : '0'+new Date(this.state.articleVal.createTime).getHours();
            cTime+= ':';
            cTime+= new Date(this.state.articleVal.createTime).getMinutes() >9 ? new Date(this.state.articleVal.createTime).getMinutes() : '0' + new Date(this.state.articleVal.createTime).getMinutes();
            cTime+= ':';
            cTime+= new Date(this.state.articleVal.createTime).getSeconds() >9 ? new Date(this.state.articleVal.createTime).getSeconds() : '0' + new Date(this.state.articleVal.createTime).getSeconds();
        return (
            <div id="layout">
                <PageHead sginOut={this.sginOut} />
                <div className="add-content">
                     <div>
                         <label>Title:{this.state.articleVal.title}</label>
                     </div>
                     <div>
                         <span>Category:{this.state.articleVal.categoryName}</span>
                     </div>
                     <div className="show">
                         <p>Content:{this.state.articleVal.content}</p>
                     </div>
                     <span>{cTime}</span>
                     {this.atricleTab()}
                </div>
                <LoadBox loadStatus={this.state.loadStatus} />
            </div>
        )
	}
})


module.exports = ViewArticle;






























