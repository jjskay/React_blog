var ListActions = {};
var ListStore = require('../stores/ListStore');
var AuthStore = require('../stores/AuthStore');
var _ = require('lodash');

ListActions.GetList = function (context, payload, done) {
	    	context.service.read('list', payload, {}, function(err, list){
		         if(err){
		         	 throw err;
		         }
		         list ? '' : list = [{path:'/',id:'/',title:'title1'},{path:'/',id:'/',title:'title1'},{path:'/',id:'/',title:'title1'},{path:'/',id:'/',title:'title1'}]
		         context.dispatch('GET_LIST',list);
			})
     		done();
};

ListActions.AddCategoryShow = function(context, payload, done){
	context.dispatch('ADD_CATEGORY_SHOW',{val:payload.val});
	done();
}

ListActions.AddCategoryError = function(context, payload, done){
	context.dispatch('ADD_CATEGORY_ERROR',{val:payload.val});
	done();
}

ListActions.AddCategoryApi = function(context, payload, done){
    var categoryList = context.getStore('AuthStore').isLoginCookie.list;
    if(!categoryList){
    	context.service.read('LoadSession', payload, {}, function(err, user){
	         if(user){
	         	categoryList = user[0].list;
	         	if(_.pluck(_.filter(categoryList,{'categoryName':payload.val}),'categoryName').length !== 0){
			    	context.dispatch('ADD_CATEGORY_ERROR',{val:'Category name already exists, can not be repeated!'});
			    }else{
                    context.dispatch('ADD_CATEGORY_ERROR',{val:''});
                    context.service.update('category', payload, {name:payload.val,id:categoryList.length}, function(err, res){
                    	if(err){
                    		throw err;
                    	}
                        if(res){
                        	window.location.reload();
                        }
                    })
			    }
	         }else{
	         	context.dispatch('LOG_OUT');
	         }
		})
    }else{
    	if(_.pluck(_.filter(categoryList,{'categoryName':payload.val}),'categoryName').length !== 0){
	    	context.dispatch('ADD_CATEGORY_ERROR',{val:'Category name already exists, can not be repeated!'});
	    }else{
            context.dispatch('ADD_CATEGORY_ERROR',{val:''});
            context.service.update('category', payload, {name:payload.val,id:categoryList.length}, function(err, res){
                if(err){
                    throw err;
                 }
                 if(res){
                    window.location.reload();
                 }
            })
	    }
    }
	done();
}

ListActions.DeleteCategory = function(context, payload, done){
	var categoryList = context.getStore('AuthStore').isLoginCookie.list;
    if(!categoryList){
    	context.service.read('LoadSession', payload, {}, function(err, user){
	         if(user){
	         	context.service.delete('category', payload, {name:payload.val,id:payload.id}, function(err, res){
	                if(err){
	                    throw err;
	                 }
	                 if(res){
	                    window.location.reload();
	                 }
	            })
	         }else{
	         	context.dispatch('LOG_OUT');
	         }
		})
    }else{
    	if(_.pluck(_.filter(categoryList,{'categoryName':payload.val}),'categoryName').length !== 0){
	    	context.dispatch('ADD_CATEGORY_ERROR',{val:'Category name already exists, can not be repeated!'});
	    }else{
            context.dispatch('ADD_CATEGORY_ERROR',{val:''});
            context.service.delete('category', payload, {name:payload.val,id:payload.id}, function(err, res){
                if(err){
                    throw err;
                 }
                 if(res){
                    window.location.reload();
                 }
            })
	    }
    }
	done();
}


module.exports = ListActions;