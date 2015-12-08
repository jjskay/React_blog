var createStore = require('fluxible/addons/createStore');

var AuthStore = createStore({
	storeName: 'AuthStore',

	handlers: {
		'LOAD_SESSION':'loadsession',
        'GET_LIST_SUCC': 'listSucc',
        'GET_LIST_FAIL': 'listFail',
        'INSERT_SUCC': 'insertSucc',
        'INSERT_FAIL': 'inserFail'
	},

	initialize: function(){
        this.signLocation = false;
        this.user = null;
        this.insert = null;
	},

	loadsession:function(uid){
		this.loginStatusCookie = uid;
        this.emitChange();
	},

    insertSucc: function(){
        this.insert = true;
        this.emitChange();
    },

    inserFail: function(){
        this.insert = false;
        this.emitChange();
    },

    getInsertStatus: function(){
        return this.insert;
    },

    listSucc: function(val){
        this.user = val;

        this.emitChange();
    },

    listFail: function(){
        this.user = null;
        this.emitChange();
    },

    getUser: function(){
        return this.user;
    },

    isLoginCookie: function(){
         return this.loginStatusCookie
    },

	dehydrate: function(){
		return {
            loginStatusCookie: this.loginStatusCookie,
            user: this.user,
		}
	},

	rehydrate: function(state){
        this.loginStatusCookie = state.loginStatusCookie;
        this.user = state.user;
	}
})

module.exports = AuthStore;






































