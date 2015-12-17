var ListActions = {};
var ListStore = require('../stores/ListStore');
var AuthStore = require('../stores/AuthStore')

ListActions.GetList = function (context, payload, done) {
	    	context.service.read('list', payload, {}, function(err, list){
		         if(err){
		         	 throw err;
		         }
		         list ? '' : list = [{path:'/',id:'/',title:'title1'},{path:'/',id:'/',title:'title1'},{path:'/',id:'/',title:'title1'},{path:'/',id:'/',title:'title1'}]
		         console.log(list)
		         context.dispatch('GET_LIST',list);
			})
     		done();
};


module.exports = ListActions;