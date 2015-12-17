var React = require('react');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var ReactIntl = require('react-intl');
var { IntlMixin, FormattedMessage } = ReactIntl;

var AuthStore = require('../../stores/AuthStore');
var AuthActions = require('../../actions/AuthActions');
var {HeaderNav, HeaderSearch} = require('./utilsUI');

var PageHead = React.createClass({

	mixins: [IntlMixin,FluxibleMixin],

	propTypes: {
       val: React.PropTypes.string,
       navData: React.PropTypes.array,
	},

	statics: {
		storeListeners: [AuthStore]
	},

	getInitialState: function(){
		return this.getStateFromStores();

	},

	getDefaultProps() {
        return {
            val: '22222222222',
            navData: [
            				{text:'Home',menu:[]},
                    {text:'APP',menu:[]},
                    {text:'ART',menu:[]},
            				{text:'MORE',menu:[{text:'账号设置',path:'/'},{text:'寻找好友',path:'/'}]},
            		 ],
            navSelectedIndex: 0,
            searchStatus: false,
            searchDataHot: [
                        {text:'我运动中的样子',path:'/'},
                        {text:'我运动中的样子',path:'/'},
                        {text:'我运动中的样子',path:'/'}
            		]

        };
    },

	getStateFromStores: function(){
		return {
			isLogin: this.getStore(AuthStore).isLoginCookie()
		}
	},

	onclickMenuShow(index,ev){
        if(this.state.navSelectedIndex !== index){
        	this.setState({navSelectedIndex: index})
        }
	},

	onfocusShow(bool){
        if(this.state.searchStatus !== bool){
             this.setState({searchStatus: bool})
        }
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
		var _ = this;
        return (
        	<div className="page-header">
                <div className="page-header-content">
                     <Link to="/">m@gicpoint</Link>
                     <div className="page-header-nav">
                          <HeaderSearch
                          searchStatus={this.state.searchStatus}
                          searchDataHot={this.props.searchDataHot}
                          onfocusShow={this.onfocusShow} />
                          <HeaderNav navData={this.props.navData} onclickMenuShow={_.onclickMenuShow} tabIndex={_.state.navSelectedIndex} />
                     </div>
                </div>
        	</div>
        )
	},
})


module.exports = PageHead;






























