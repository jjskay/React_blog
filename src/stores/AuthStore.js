var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({
	storeName: 'AuthStore',

	handlers: {
		'LOAD_SESSION':'loadsession',

	},

	initialize: function(){
        this.loginStatusCookie = null;
	},

	loadsession:function(uid){
		this.loginStatusCookie = !this.loginStatusCookie;
        this.emitChange();
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






































