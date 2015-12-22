var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({
	storeName: 'AuthStore',

	handlers: {
		'LOAD_SESSION':'loadsession',
		'REG_START': 'regStart',
		'REG_SUCC': 'regSucc',
		'REG_FAIL': 'regFail',
		'LOGIN_START': 'loginStart',
		'LOGIN_SUCC': 'loginSucc',
        'LOGIN_FAIL': 'loginFail',
        'LOG_OUT': 'logOut',
        'CATEGORY_INDEX': 'ctegoryIndex',
        'ATRICLE_LIST': 'acricleList',
        'CATEGORY_INDEX_CHANGE': 'categoryIndexChange'
	},

	initialize: function(){
        this.loginStatusCookie = null;
        this.regStatus = false;
        this.regSuccIfo = false;
        this.regFailErr = '';
        this.loginStatus = false;
        this.loginError = '';
        this.locaReload = false;
        this.categoeyIndex = 0;
        this.acricleListView = null;
	},

	loginStart: function(){
        this.loginStatus = true;
        this.emitChange();
	},

	categoryIndexChange: function(id){
        this.categoeyIndex = id.id;
        this.emitChange();
	},

	loadsession:function(userinfo){
		if(userinfo){
			this.loginStatusCookie = userinfo;
			this.emitChange();
		}
	},

	acricleList: function(list){
        this.acricleListView = list.list;
        this.emitChange();
	},

	ctegoryIndex: function(index){
        this.categoeyIndex = index;
        this.emitChange();
	},

	logOut: function(){
        this.loginStatusCookie = null;
        this.emitChange();
	},

	loginSucc: function(){
        this.regSuccIfo = true;
        this.loginStatus = false;
        this.loginError = '';
        this.locaReload = true;
		this.emitChange();
	},

	loginFail: function(){
        this.loginStatus = false;
        this.loginError = 'Error:Password or username error!';
        this.emitChange();
	},

	regStart: function(){
        this.regStatus = true;
        this.emitChange();
	},

	regSucc: function(user){
		this.regSuccIfo = user;
		this.regFailErr = '';
		this.regStatus = false;
        this.emitChange();
	},

	regFail: function(err){
        this.regFailErr = err;
        this.emitChange();
	},

	getRegStatus: function(){
        return this.regStatus;
	},

	getSuccInfo: function(){
        return this.regSuccIfo;
	},

	getCategoryIndex: function(){
        return this.categoeyIndex;
	},

	getRegErr: function(){
		return this.regFailErr;
	},

	getLoginStatus: function(){
        return this.loginStatus;
	},

	getLoginError: function(){
        return this.loginError;
	},

	getReloadStatus: function(){
		return this.locaReload;
	},

    isLoginCookie: function(){
         return this.loginStatusCookie;
    },

    getAcricleList: function(){
         return this.acricleListView;
    },

	dehydrate: function(){
		return {
            loginStatusCookie: this.loginStatusCookie,
            regStatus: this.regStatus,
            regSuccIfo: this.regSuccIfo,
            regFailErr: this.regFailErr,
            loginStatus: this.loginStatus,
            loginError: this.loginError,
            locaReload: this.locaReload,
            acricleListView: this.acricleListView,
		}
	},

	rehydrate: function(state){
        this.loginStatusCookie = state.loginStatusCookie;
        this.regStatus = state.regStatus;
        this.regSuccIfo = state.regSuccIfo;
	    this.regFailErr = state.regFailErr;
	    this.loginStatus = state.loginStatus;
	    this.loginError = state.loginError;
	    this.locaReload = state.locaReload;
	    this.acricleListView = state.acricleListView;
	}
})

module.exports = AuthStore;






































