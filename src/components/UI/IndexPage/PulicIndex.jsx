var React = require('react');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var classSet = require('classnames');

var AuthStore = require('../../../stores/AuthStore');
var AuthActions = require('../../../actions/AuthActions');

var {PublicSlider} = require('../publicSlider');
var {Tab, Tabs} = require('../Tab')

var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var {CheckBox, IconButton} = require('../utilsUI');

var PulicIndex = React.createClass({

	prpoTypes: {
    loginStatusFunc: React.PropTypes.func
	},

	statics: {
		storeListeners: [AuthStore]
	},

	mixins: [FluxibleMixin,],

  componentDidMount: function () {
      window.onscroll = this.onScrollEven;
      if(JSON.parse(localStorage.locaUserInfo).username && JSON.parse(localStorage.locaUserInfo).password){
          React.findDOMNode(this.refs.loginUser).value = JSON.parse(localStorage.locaUserInfo).username;
          React.findDOMNode(this.refs.loginPasswd).value = JSON.parse(localStorage.locaUserInfo).password;
      }
  },

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
      rememberStatus: true,
      showFooter: false,
      regStatus: this.getStore(AuthStore).getRegStatus(),
      regError: this.getStore(AuthStore).getRegErr(),
      loginError: this.getStore(AuthStore).getLoginError(),
      regSucc: this.getStore(AuthStore).getSuccInfo(),
      loginStatus: this.getStore(AuthStore).getLoginStatus(),
		}
	},

	onChange: function(){
    if(this.getStore(AuthStore).getReloadStatus()){
        this.props.loginStatusFunc();
    }
    var _ = this;
		_.setState(this.getStateFromStores());
    if(_.state.regSucc){
       setTimeout(function(){
           _.tabInex = 1;
           _.setState({regSucc: false});
       },3000)
    }
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
    var showFooter = classSet({
         'auto-show-footer': true,
         "on": this.state.showFooter
    })
    var regSuccClass = classSet({
         'reg-succ-box': true,
         'active': Boolean(this.state.regSucc.user)
    })
        return (
           <div className="public-index">
                <div className="banner">
                    <PublicSlider {...data} />
                    <div className="banner-tab">
                        <h3>m@gicpoint</h3>
                        <Tabs initialSelectedIndex={this.tabInex}>
                             <Tab label={tabSections.tab1}>
                                  <div><input ref="regUser" type="text" placeholder="User" /></div>
                                  <div><input ref="regPasswd" type="password" placeholder="Password" /></div>
                                  <div>{this.regButton()}</div>
                                  <span>{this.state.regError}</span>
                             </Tab>
                             <Tab label={tabSections.tab2}>
                                  <form onSubmit={this.loginSub}>
                                       <div><input ref="loginUser" type="text" placeholder="User" /></div>
                                       <div><input ref="loginPasswd" type="password" placeholder="Password" /></div>
                                       <div>{this.loginButton()}</div>
                                       <span>{this.state.loginError}</span>
                                  </form>
                                  <p>
                                    <CheckBox
                                           rememberChecked={this.rememberChecked}
                                           text="Remember Password"
                                           rememberStatus={this.state.rememberStatus} />
                                    <Link to="/">忘记密码&nbsp;&nbsp;|&nbsp;&nbsp;找回账号</Link>
                                   </p>
                             </Tab>
                             <Tab label={tabSections.tab3}>
                                  <div>Is None!</div>
                             </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="public-content">
                    <div className="content-list width-1000">
                         <h3>随性的记录方式</h3>
                         <h5>方便地记录照片、文字、音乐、视频，适用于iPhone、iPad和Android移动客户端及PC端，
让你随时随地的记录与分享。</h5>
                         <div><img src="/img/public-1.jpg" /></div>
                    </div>
                    <div className="content-list">
                         <h3>发现有共同爱好的人</h3>
                         <h5>LOFTER汇聚了数百万的摄影、胶片玩家，绘画及动漫爱好者，并不断衍生出更多的兴趣圈子，无论是设计、
艺术、科技、时尚、旅行、读书、电影评论都有精彩的人与内容不断产出。</h5>
                         <div className="content-auto"><img src="/img/public-2.jpg" /></div>
                    </div>
                    <div className="content-list">
                         <h3>轻巧的移动LOFTER</h3>
                         <h5>通过iPhone、iPad版及Android版客户端，体验LOFTER的快速、漂亮、有趣，提供多种时下最热的贴纸，
让你的相片分享增加乐趣，还可以在移动端查看附近的人。 </h5>
                         <div className="auto"><img src="/img/public-3.jpg" /></div>
                    </div>
                    <div className="content-list width-1000 ">
                         <h3>LOFTER - 每个人的理想国</h3>
                         <h5>注册免费冲印20张照片</h5>
                         <div className="fixed">
                            <IconButton text="邮箱注册" iconClass="icon-firefox" navigationPath="/" bgColor="#8db800" />
                            <IconButton text="新浪微博注册" iconClass="icon-wechat" navigationPath="/" bgColor="#e65e42" />
                            <IconButton text="腾讯QQ注册" iconClass="icon-qq" navigationPath="/" bgColor="#308eb5" />
                            <IconButton text="微信注册" iconClass="icon-envelopeo" navigationPath="/" bgColor="#8db800" />
                         </div>
                    </div>
                    <div className={showFooter}>
                         <div>
                              <span>注册免费冲印20张照片：</span>
                               <div className="fixed">
                                  <IconButton text="邮箱注册" iconClass="icon-firefox" navigationPath="/" bgColor="#8db800" />
                                  <IconButton text="新浪微博注册" iconClass="icon-wechat" navigationPath="/" bgColor="#e65e42" />
                                  <IconButton text="腾讯QQ注册" iconClass="icon-qq" navigationPath="/" bgColor="#308eb5" />
                                  <IconButton text="微信注册" iconClass="icon-envelopeo" navigationPath="/" bgColor="#8db800" />
                               </div>
                         </div>
                    </div>
                </div>
                <div className={regSuccClass}>
                    <p>尊敬的<span className="c-red">{this.state.regSucc.user && this.state.regSucc.user.ops[0].username}</span>用户，恭喜你注册成功！3秒后请重新登录！</p>
                </div>
           </div>
        )
	},

  rememberChecked(){
     var checkStatus = this.state.rememberStatus;
     checkStatus = !checkStatus;
     this.setState({rememberStatus: checkStatus});
  },

  onScrollEven() {
     var t = window.scrollY;
     var windwowHeight = window.screen.height;
     var height = document.getElementById('layout').offsetHeight;
     var showStatus = this.state.showFooter;
     if(height - t - windwowHeight >= 50){
         showStatus ? '' : this.setState({showFooter: true});
     }else{
         showStatus ? this.setState({showFooter: false}) : '';
     }
  },

  regButton() {
     var text;
     !this.state.regStatus ? text = 'Reg' : text = 'Reging';
     return <input type="button" value={text} onClick={this.clickReg}/>;
  },

  loginButton() {
    var disabled;
    var text = 'Login';
    if(this.state.loginStatus){
        text = 'Login...';
        disabled = 'disabled';
    }

    return <input type="submit" value={text} onClick={this.clickLogin} disabled={disabled}/>;
  },

  clickReg() {
     var u = false, p = false;
     var user = React.findDOMNode(this.refs.regUser).value.replace(/(^\s+)|(\s+$)/g, "");
     var passwd = React.findDOMNode(this.refs.regPasswd).value.replace(/(^\s+)|(\s+$)/g, "");
     var obj = {};
     obj.username = user;
     obj.password = passwd
     user.length >= 4 ? u = true : u = false;
     passwd.length >= 6 ? p = true : p = false;
     if(!u){
        this.setState({regError: 'Info:Username least four characters'})
     }else if (u && !p){
        this.setState({regError: 'Info:Password of at least six characters'})
     }else{
        this.context.executeAction(AuthActions.Reg,{obj:obj});
        React.findDOMNode(this.refs.regUser).value = '';
        React.findDOMNode(this.refs.regPasswd).value = '';
     }

  },

  locaStorageSave(obj){
     localStorage.setItem('locaUserInfo',JSON.stringify(obj));
  },

  localStorageDelete(){
     localStorage.removeItem('locaUserInfo');
  },

  loginSub(e) {
     e.preventDefault();
     var u = false, p = false;
     var username = React.findDOMNode(this.refs.loginUser).value.replace(/(^\s+)|(\s+$)/g, "");
     var password = React.findDOMNode(this.refs.loginPasswd).value.replace(/(^\s+)|(\s+$)/g, "");
     username.length >= 4 ? u = true : u = false;
     password.length >= 6 ? p = true : p = false;
     var obj = {};
     obj.username = username;
     obj.password = password;
     if(this.state.rememberStatus){
         this.locaStorageSave(obj);
     }else{
         this.localStorageDelete();
     }
     if(!u){
        username == '' ? this.setState({loginError: 'Error:Please enter your username!'}) : this.setState({loginError: 'Error:This user does not exist!'})
     }else if(u && !p){
        password == '' ? this.setState({loginError: 'Error:Please enter your password!'}) : this.setState({loginError: 'Error:Password error!'});
     }else{
        this.context.executeAction(AuthActions.Login,{obj: obj})
     }
  }

})


module.exports = PulicIndex;