var createStore = require('fluxible/addons/createStore');

var ListStore = createStore({
	storeName: 'ListStore',

	handlers: {
		'GET_LIST':'listInfo',
	},

	initialize: function(){
        this.list = [];
	},

	listInfo: function(list){
        this.list = list;
        this.emitChange();
	},

    getList: function(){
         return this.list;
    },

	dehydrate: function(){
		return {
            list: this.list,
		}
	},

	rehydrate: function(state){
        this.list = state.list;
	}
})

module.exports = ListStore;






































