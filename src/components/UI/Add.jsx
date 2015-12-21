var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var {IntlMixin,FormattedMessage} = require('react-intl');
var {concurrent} = require('contra');
import Router,{Route, RouteHandler, Link, State, Navigation} from 'react-router';

var {CategorySelector, } = require('./utilsUI');
var ReactIntl = require('react-intl');

var {AuthMixin} = require('../../mixins')

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');
var ListActions = require('../../actions/ListActions');
var ListStore = require('../../stores/ListStore');

var PageHead = require('./PageHead');
var AuthMixins = require('../../utils/AuthMixins');

var Home = React.createClass({

	mixins: [IntlMixin, FluxibleMixin, AuthMixins],

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
            categoryShow: this.getStore(ListStore).getCategoryShow(),
		}
	},

	onChange: function(){
		if(!this.state.isLoginCookie){
			this.transitionTo('/');
		}
        this.setState(this.getStateFromStores());
	},

    sginOut: function(){
        this.context.executeAction(AuthActions.LogOut, {})
    },

    render: function(){
        return (
            <div id="layout">
                <PageHead sginOut={this.sginOut} />
                <div className="add-content">
                     <div>
                         <label>Title:<input ref="title" type="text" placeholder="Please enter titele!"/></label>
                     </div>
                     <div>
                         <CategorySelector
                         categoryList={this.state.categoryList}
                         categoryShow={this.state.categoryShow}/>
                     </div>
                     <div>
                         <label>Content:</label>
                         <textarea ref="add-content"></textarea>
                     </div>
                </div>
            </div>
        )
	},

})


module.exports = Home;






























