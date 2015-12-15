var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({
	storeName: 'AuthStore',

	handlers: {
		'LOAD_SESSION':'loadsession',
		'REG_START': 'regStart',
		'REG_SUCC': 'regSucc',
		'REG_FAIL': 'regFail'

	},

	initialize: function(){
        this.loginStatusCookie = true;
        this.regStatus = false;
        this.regSuccIfo = false;
        this.regFailErr = '';
	},

	loadsession:function(userid){
		if(userid !== this.loginStatusCookie){
			// this.loginStatusCookie = userid;
			// this.emitChange();
		}
	},

	regStart: function(){
        this.regStatus = true;
        this.emitChange();
	},

	regSucc: function(user){
		this.regSuccIfo = user;
		this.regFailErr = '';
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

	getRegErr: function(){
		return this.regFailErr;
	},

    isLoginCookie: function(){
         return this.loginStatusCookie
    },

	dehydrate: function(){
		return {
            loginStatusCookie: this.loginStatusCookie,
            regStatus: this.regStatus,
            regSuccIfo: this.regSuccIfo,
            regFailErr: this.regFailErr
		}
	},

	rehydrate: function(state){
        this.loginStatusCookie = state.loginStatusCookie;
        this.regStatus = state.regStatus;
        this.regSuccIfo = state.regSuccIfo;
	    this.regFailErr = state.regFailErr;
	}
})

module.exports = AuthStore;






































