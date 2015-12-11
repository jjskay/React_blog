var React = require('react');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var AuthStore = require('../../../stores/AuthStore');
var AuthActions = require('../../../actions/AuthActions');

var {PublicSlider} = require('../publicSlider');
var {Tab, Tabs} = require('../Tab')

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
		var tabSections = {
            tab1: {
                title: 'REG',
                menu: []
            },
            tab2: {title: 'LOGIN', menu: []},
            tab3: {title: 'APP', menu: []},
        }
        return (
           <div className="public-index">
                <div className="banner">
                    <PublicSlider {...data} />
                    <div className="banner-tab">
                        <h3>m@gicpoint</h3>
                        <Tabs>
                             <Tab label={tabSections.tab1}>
                                  <div><input type="email" placeholder="Email" /></div>
                                  <div><input type="password" placeholder="Password" /></div>
                                  <div><input type="button" value='Reg' obClick={this.clickReg}/></div>
                                  <p><label><input type="checkbox" id="reg-check"/>记住密码</label><Link to="/">忘记密码|找回账号</Link></p>
                             </Tab>
                             <Tab label={tabSections.tab2}>
                                  <div><input type="email" placeholder="Email" /></div>
                                  <div><input type="password" placeholder="Password" /></div>
                                  <div><input type="button" value='Login' obClick={this.clickReg}/></div>
                             </Tab>
                             <Tab label={tabSections.tab3}>
                                  <div>Is None!</div>
                             </Tab>
                        </Tabs>
                    </div>
                </div>
           </div>
        )
	},

})


module.exports = PulicIndex;