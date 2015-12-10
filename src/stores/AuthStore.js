var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({
	storeName: 'AuthStore',

	handlers: {
		'LOAD_SESSION':'loadsession',

	},

	initialize: function(){
        this.loginStatusCookie = false;
	},

	loadsession:function(userid){
		if(userid !== this.loginStatusCookie){
			this.loginStatusCookie = userid;
			this.emitChange();
		}
	},

    isLoginCookie: function(){
         return this.loginStatusCookie
    },

	dehydrate: function(){
		return {
            loginStatusCookie: this.loginStatusCookie,
		}
	},

	rehydrate: function(state){
        this.loginStatusCookie = state.loginStatusCookie;
	}
})

module.exports = AuthStore;






































