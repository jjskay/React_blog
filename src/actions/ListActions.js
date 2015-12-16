var ListActions = {};
var ListStore = require('../stores/ListStore');
var AuthStore = require('../stores/AuthStore')

ListActions.GetList = function (context, payload, done) {
    context.service.read('list', payload, {}, function(err, list){
    	console.log(context.getStore(AuthStore).isLoginCookie())
         if(err){
         	 throw err;
         }
         context.dispatch('GET_LIST',list);
	})
	done();
};


module.exports = ListActions;