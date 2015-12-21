var createStore = require('fluxible/addons/createStore');

var ListStore = createStore({
	storeName: 'ListStore',

	handlers: {
		'GET_LIST':'listInfo',
		'ADD_CATEGORY_SHOW': 'addCategoryShod',
		'ADD_CATEGORY_ERROR': 'addCategoryError',
	},

	initialize: function(){
        this.list = [];
        this.categoryVisiable = false;
        this.addCategroyError = '';
        this.categoryShow = false;
	},

	listInfo: function(list){
        this.list = list;
        this.emitChange();
	},

	addCategoryError: function(val){
        this.addCategroyError = val.val;
        this.emitChange();
	},

	addCategoryShod: function(val){
        this.categoryVisiable = val.val;
        this.emitChange();
	},

    getList: function(){
         return this.list;
    },

	getCategoryVisiable: function(){
         return this.categoryVisiable;
	},

	getCategoryShow: function(){
         return this.categoryShow;
	},

	getAddCategroyError: function(){
         return this.addCategroyError;
	},

	dehydrate: function(){
		return {
            list: this.list,
            categoryVisiable: this.categoryVisiable,
            addCategroyError: this.addCategroyError,
            categoryShow: this.categoryShow,
		}
	},


	rehydrate: function(state){
        this.list = state.list;
        this.categoryVisiable = state.categoryVisiable;
        this.addCategroyError = state.addCategroyError;
        this.categoryShow = state.categoryShow;
	}
})

module.exports = ListStore;






































