var React = require('react');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var AuthStore = require('../../../stores/AuthStore');
var AuthActions = require('../../../actions/AuthActions');

var {PublicSlider} = require('../publicSlider');
// var {UrlStatic} = require('../../../mixins')

import FluxibleMixin from 'fluxible/addons/FluxibleMixin';

var PulicIndex = React.createClass({

	prpoTypes: {
		isLogin: React.PropTypes.bool
	},

	statics: {
		storeListeners: [AuthStore]
	},

	mixins: [FluxibleMixin],

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			isLogin: this.getStore(AuthStore).isLoginCookie()
		}
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
		var data = {
			imgArr:["/img/slider.jpg","/img/slider1.jpg","/img/slider2.jpg","/img/slider3.jpg","/img/slider4.jpg","/img/slider5.jpg"],
			textArr:["Slider1","Slider2","Slider3","Slider4","Slider5","Slider6"]
		}
        return (
           <div className="public-index">
                <div className="banner">
                    <PublicSlider {...data} />
                    <div className="banner-tab">
                        <h3>m@gicpoint</h3>
                    </div>
                </div>
           </div>
        )
	},

})


module.exports = PulicIndex;