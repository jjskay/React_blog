var ListActions = {};
var ListStore = require('../stores/ListStore');
var AuthStore = require('../stores/AuthStore');
var _ = require('lodash');

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
			    	done();
			    }else{
                    context.dispatch('ADD_CATEGORY_ERROR',{val:''});
                    context.service.update('category', payload, {name:payload.val,id:categoryList.length}, function(err, res){
                    	if(err){
                    		throw err;
                    	}
                        if(res){
                        	window.location.reload();
                        }
                        done();
                    })
			    }
	         }else{
	         	context.dispatch('LOG_OUT');
	         	done();
	         }
		})
    }else{
    	if(_.pluck(_.filter(categoryList,{'categoryName':payload.val}),'categoryName').length !== 0){
	    	context.dispatch('ADD_CATEGORY_ERROR',{val:'Category name already exists, can not be repeated!'});
	    	done();
	    }else{
            context.dispatch('ADD_CATEGORY_ERROR',{val:''});
            context.service.update('category', payload, {name:payload.val,id:categoryList.length}, function(err, res){
                if(err){
                    throw err;
                 }
                 if(res){
                    window.location.reload();
                 }
                 done();
            })
	    }
    }
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
	                 done();
	            })
	         }else{
	         	context.dispatch('LOG_OUT');
	         	done();
	         }
		})
    }else{
    	if(_.pluck(_.filter(categoryList,{'categoryName':payload.val}),'categoryName').length !== 0){
	    	context.dispatch('ADD_CATEGORY_ERROR',{val:'Category name already exists, can not be repeated!'});
	    	done();
	    }else{
            context.dispatch('ADD_CATEGORY_ERROR',{val:''});
            context.service.delete('category', payload, {name:payload.val,id:payload.id}, function(err, res){
                if(err){
                    throw err;
                 }
                 if(res){
                    window.location.reload();
                 }
                 done();
            })
	    }
    }

}


ListActions.categorySelectChange = function(context, payload, done){
     context.dispatch('CATEGORY_CHANGE',{bool:payload.bool,name:payload.name,id:payload.id});
     done();
}

ListActions.LoadStart = function(context, payload, done){
    context.dispatch('LOAD_START',{});
    done();
}

ListActions.ConfirmBoxShow = function(context, payload, done){
	context.dispatch('CONFIRM_SHOW',{bool:payload.bool});
	done();
}

ListActions.AddArticle = function(context, payload, done){
	context.dispatch('LOAD_START',{})
	context.service.create('list', payload, {obj:payload.obj}, function(err, list){
		context.dispatch('LOAD_END',{})
		if(list){
			var userList = context.getStore(AuthStore).isLoginCookie().list;
			userList[0].num++;
            var index = _.findIndex(userList,function(val){
            	return val.categoryId == list.ops[0].categoryId
            })
            var sessionList = context.sessionStorage.get('list');
            sessionList.push(payload.obj);
            context.sessionStorage.set('list',sessionList);
            userList[index].num++;
			context.service.update('category', payload, {up:1,list:userList}, function(err, res){
                    if(err){
                    	throw err;
                    }
                    if(res){
                    	context.dispatch('ADD_ARTICLE_SUCC',{});
                    	context.service.read('LoadSession', payload, {up:1}, function(err, user){
					         var user = user ? user[0] : null;
					         context.dispatch('LOAD_SESSION', user);
                        	 context.service.read('list',payload, {}, function(err, res){
							         if(err){
							         	 return err;
							         }
							         context.sessionStorage.set('list',res);
									 context.dispatch('STORE_ARTICLES',{list:res})
									 context.getRouter().transitionTo('/');
									 done();
							 })
                        	 done();
						})
                    }
             })
		}else{
			context.dispatch('ADD_ARTICLE_FAIL',{});
			 done();
		}
	})

}

ListActions.EditArticle = function(context, payload, done){
    context.service.update('LoadSession', payload, {obj:payload.obj}, function(err, res){
               if(err){
                throw err;
               }
               if(res){
               	    console.log(res)
	                context.dispatch('ADD_ARTICLE_SUCC',{});
	                context.service.read('LoadSession', payload, {up:1}, function(err, user){
						    var user = user ? user[0] : null;
						    context.dispatch('LOAD_SESSION', user);
	                     context.getRouter().transitionTo('/');
	                     done();
					})
               }else{
               	    done();
               }
    })
}

ListActions.SubmitError = function(context, payload, done){
    context.dispatch('ADD_ATRICLE_ERR',{err:payload.error})
	done();
}

ListActions.DeteleArticle = function(context, payload, done){
	var categoryId = payload.categoryId;
	// var id = 'ObjectId("'+ payload.id +'")';
     context.service.delete('list',payload, {id:payload.id,time:payload.createTime}, function(err, res){
         if(err){
         	 return err;
         }
         if(res){
             context.executeAction(ListActions.ConfirmBoxShow, {bool:false});
             var userList = context.getStore(AuthStore).isLoginCookie().list;
			 userList[0].num--;
             var index = _.findIndex(userList,function(val){
            	 return val.categoryId == categoryId
             })
             userList[index].num--;
             context.service.update('category', payload, {up:1,list:userList}, function(err, res){
                    if(err){
                    	throw err;
                    }
                    if(res){
                    	context.dispatch('ADD_ARTICLE_SUCC',{});
                    	context.service.read('LoadSession', payload, {up:1}, function(err, user){
					         var user = user ? user[0] : null;
					         context.dispatch('LOAD_SESSION', user);
					         context.service.read('list',payload, {}, function(err, res){
							         if(err){
							         	 return err;
							         }
							         context.sessionStorage.set('list',res);
									 context.dispatch('STORE_ARTICLES',{list:res})
									 context.getRouter().transitionTo('/');
									 done();
							 })
						})
                    }
             })
         }else{
         	done();
         }
    })
}

ListActions.GetAtricleList = function(context, payload, done){
    if(context.sessionStorage.get('list')){
    	var list = context.sessionStorage.get('list');
		context.dispatch('STORE_ARTICLES',{list:list})
		done();
    }else{
        context.service.read('list',payload, {}, function(err, res){
	         if(err){
	         	 return err;
	         }
	         context.sessionStorage.set('list',res);
			 context.dispatch('STORE_ARTICLES',{list:res})
			 done();
	    })
    }

}

ListActions.GetAtricleOnce = function(context, payload, done){
	 var list = context.sessionStorage.get('list');
     var index_ = _.findIndex(list,function(val){
            	 return val.createTime == payload.createTime
          })
     if(list && index_ > -1){
     	  context.dispatch('GET_ATRICLE_ONE', {obj: list[index_]});
     	  done();
     }else{
          context.service.read('list',payload, {createTime:payload.createTime}, function(err, res){
		         if(err){
		         	 return err;
		         }
		         var index = _.findIndex(res,function(val){
	            	 return val.createTime == payload.createTime
	             })
		         context.sessionStorage.set('list',res);
				 context.dispatch('GET_ATRICLE_ONE',{obj:res[index]})
				 done();
		   })
     }
}

module.exports = ListActions;