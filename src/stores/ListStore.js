var createStore = require('fluxible/addons/createStore');

var ListStore = createStore({
	storeName: 'ListStore',

	handlers: {
		'GET_LIST':'listInfo',
		'ADD_CATEGORY_SHOW': 'addCategoryShod',
		'ADD_CATEGORY_ERROR': 'addCategoryError',
		'CATEGORY_CHANGE': 'categoryChange',
		'LOAD_START': 'loadStart',
		'LOAD_END': 'loadEnd',
		'ADD_ATRICLE_ERR': 'addAtricle_err',
		'ADD_ARTICLE_SUCC': 'addAtricleSucc',
		'STORE_ARTICLES':'storeArticles',
		'CONFIRM_SHOW': 'confirmShow',
		'GET_ATRICLE_ONE': 'settAtricleOne',
	},

	initialize: function(){
        this.list = [];
        this.categoryVisiable = false;
        this.addCategroyError = '';
        this.categorySelected = {
        	name:'Please select category!',
        	id:null,
        	bool:false
        };
        this.articleError = '';
        this.loadStatus = false;
        this.confirmBoxStatus = false;
        this.atricleOne = {
        	title:'',
        	content:'',
        	categoryId:0
        };
	},

	addAtricle_err: function(err){
		this.articleError = err;
		this.emitChange();
	},

	settAtricleOne: function(obj){
        this.atricleOne = obj.obj;
        this.categorySelected.id = obj.obj.categoryId;
        this.categorySelected.name = obj.obj.categoryName;
        this.emitChange();
    },

	confirmShow: function(val){
        this.confirmBoxStatus = val.bool;
        this.emitChange();
	},

	addAtricleSucc: function(){
        this.articleError = '';
        this.emitChange();
	},

	listInfo: function(list){
        this.list = list;
        this.emitChange();
	},

	addCategoryError: function(val){
        this.addCategroyError = val.val;
        this.emitChange();
	},

	loadStart: function(){
        this.loadStatus = true;
        this.emitChange();
	},

	loadEnd: function(){
		this.loadStatus = false;
        this.emitChange();
	},

	categoryChange: function(val){
		if(val.name !== ''){this.categorySelected.name = val.name}
	    if(val.id !== ''){this.categorySelected.id = val.id};
        this.categorySelected.bool = !val.bool;
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

	getAddCategroyError: function(){
         return this.addCategroyError;
	},

	getCategorySelected: function(){
         return this.categorySelected
	},

	getArticleError: function(){
		return this.articleError;
	},

	getLoadStatus: function(){
        return this.loadStatus;
	},

	getConfirmBoxStatus: function(){
		return this.confirmBoxStatus;
	},

	getAtricleOne: function(){
        return this.atricleOne;
	},

	storeArticles:function(list) {
		this.articlesList = list.list;
		this.emitChange();
	},

	getArticles:function(){
		return this.articlesList;
	},

	dehydrate: function(){
		return {
            list: this.list,
            categoryVisiable: this.categoryVisiable,
            addCategroyError: this.addCategroyError,
            categorySelected: this.categorySelected,
            articleError: this.articleError,
            articlesList:this.articlesList,
            confirmBoxStatus: this.confirmBoxStatus,
            atricleOne: this.atricleOne,
		}
	},


	rehydrate: function(state){
        this.list = state.list;
        this.categoryVisiable = state.categoryVisiable;
        this.addCategroyError = state.addCategroyError;
        this.categorySelected = state.categorySelected;
        this.articleError = state.articleError;
        this.articlesList=state.articlesList;
        this.confirmBoxStatus = state.confirmBoxStatus;
        this.atricleOne = state.atricleOne;
	}
})

module.exports = ListStore;






































