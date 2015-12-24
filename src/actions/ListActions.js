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

ListActions.AtricleInit = function(context, payload, done){
	context.dispatch('ADD_ATRICLE_INIT',{});
	done();
}

ListActions.AddCategoryApi = function(context, payload, done){
    var userinfo = context.getStore('AuthStore').isLoginCookie();
    var categoryList = userinfo && userinfo.list;
    if(!categoryList){
    	context.service.read('LoadSession', payload, {}, function(err, user){
	         if(user){
	         	categoryList = user[0].list;
	         	if(_.pluck(_.filter(categoryList,{'categoryName':payload.val}),'categoryName').length !== 0){
			    	context.dispatch('ADD_CATEGORY_ERROR',{val:'Category name already exists, can not be repeated!'});
			    	done();
			    }else{
                    context.dispatch('ADD_CATEGORY_ERROR',{val:''});
                    var newCategoryId = categoryList[categoryList.length - 1].categoryId + 1;
                    context.service.update('category', payload, {name:payload.val,id:newCategoryId}, function(err, res){
                    	if(err){
                    		throw err;
                    	}
                        if(res){
                            user[0].list.push({categoryName:payload.val,categoryId:newCategoryId,num:0});
                            context.dispatch('LOAD_SESSION', user[0]);
                            context.dispatch('ADD_CATEGORY_SHOW',{val:false});
                        	context.getRouter().transitionTo('/');
                        }
                        done();
                    })
			    }
	         }else{
	         	context.dispatch('LOG_OUT',{});
	         	done();
	         }
		})
    }else{
    	if(_.pluck(_.filter(categoryList,{'categoryName':payload.val}),'categoryName').length !== 0){
	    	context.dispatch('ADD_CATEGORY_ERROR',{val:'Category name already exists, can not be repeated!'});
	    	done();
	    }else{
            context.dispatch('ADD_CATEGORY_ERROR',{val:''});
            var newCategoryId = categoryList[categoryList.length - 1].categoryId + 1;
            context.service.update('category', payload, {name:payload.val,id:newCategoryId}, function(err, res){
                if(err){
                    throw err;
                 }
                 if(res){
                    userinfo.list.push({categoryName:payload.val,categoryId:newCategoryId,num:0});
                    context.dispatch('LOAD_SESSION', userinfo);
                    context.dispatch('ADD_CATEGORY_SHOW',{val:false});
                    context.getRouter().transitionTo('/');
                 }
                 done();
            })
	    }
    }
}

ListActions.DeleteCategory = function(context, payload, done){
	context.dispatch('LOAD_START',{});
	var userinfo = context.getStore('AuthStore').isLoginCookie();
    var categoryList = userinfo && userinfo.list;
    if(!categoryList){
    	context.service.read('LoadSession', payload, {}, function(err, user){
	         if(user){
	         	context.service.delete('category', payload, {name:payload.val,id:payload.id}, function(err, res){
	                if(err){
	                    throw err;
	                 }
	                 if(res){
	                    user[0].list.push({categoryName:payload.val,categoryId:categoryList.length,num:0});
                        _.remove(user[0].list,function(val){
                            return val.categoryId == payload.id
                        })
                        context.dispatch('LOAD_SESSION', user[0]);
                        context.dispatch('ADD_CATEGORY_SHOW',{val:false});
	                    context.dispatch('CATEGORY_INDEX_CHANGE',{id:0});
                        context.getRouter().transitionTo('/');
                        context.dispatch('LOAD_END',{});
	                 }
	                 done();
	            })
	         }else{
	         	context.dispatch('LOG_OUT');
	         	done();
	         }
		})
    }else{
            context.dispatch('ADD_CATEGORY_ERROR',{val:''});
            context.service.delete('category', payload, {name:payload.val,id:payload.id}, function(err, res){
                if(err){
                    throw err;
                 }
                 if(res){
                    _.remove(userinfo.list,function(val){
                        return val.categoryId == payload.id
                    })
                    context.dispatch('LOAD_SESSION', userinfo);
                    context.dispatch('ADD_CATEGORY_SHOW',{val:false});
                    context.dispatch('CATEGORY_INDEX_CHANGE',{id:0});
                    context.getRouter().transitionTo('/');
                    context.dispatch('LOAD_END',{});
                 }
                 done();
            })
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
					         context.dispatch('LOAD_SESSION', user[0]);
                        	 context.service.read('list',payload, {}, function(err, res){
							         if(err){
							         	 return err;
							         }
									 context.dispatch('STORE_ARTICLES',{list:res})
									 context.dispatch('LOAD_SESSION', user[0]);
									 context.getRouter().transitionTo('/');
									 context.dispatch('LOAD_END',{})
									 done();
							 })
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
                    var articleList = context.sessionStorage.get('list');
                    var atricleOne = context.getStore('ListStore').getAtricleOne();
                    var oldCategoryId = context.getStore('ListStore').getAtricleOne().categoryId;
                    var index_ = _.findIndex(articleList,function(val){
                         return val.id == atricleOne.id
                     });
                    articleList[index_] = payload.obj;
                    context.dispatch('STORE_ARTICLES',{list:articleList})
	                context.sessionStorage.set('list',articleList);
                    if(oldCategoryId !== payload.obj.categoryId){
                        var userinfo = context.getStore(AuthStore).isLoginCookie();
                        var oldCategoryIdIndex = _.findIndex(userinfo.list,function(val){
                             return val.categoryId == oldCategoryId;
                        });
                        userinfo.list[oldCategoryIdIndex].num > 0 ? userinfo.list[oldCategoryIdIndex].num-- : userinfo.list[oldCategoryIdIndex].num = 0;
                        var newCategoryIdIndex= _.findIndex(userinfo.list,function(val){
                             return val.categoryId == payload.obj.categoryId;
                        });
                        userinfo.list[newCategoryIdIndex].num++;
                        // var categoryNameIndex = _.findIndex(articleList,function(val){
                        //      return val.id == payload.obj.id;
                        // });

                        // articleList[categoryNameIndex].categoryId = payload.obj.categoryId;
                        // articleList[categoryNameIndex].categoryName = userinfo.list[newCategoryIdIndex].categoryName;
                        // context.dispatch('STORE_ARTICLES',{list:articleList})
                        // context.sessionStorage.set('list',articleList);
                        context.service.update('category', payload, {up:1,list:userinfo.list}, function(err, res){
                                if(err){
                                    throw err;
                                }
                                if(res){
                                    context.dispatch('ADD_ARTICLE_SUCC',{});
                                    context.service.read('LoadSession', payload, {up:1}, function(err, user){
                                         var user = user ? user[0] : null;
                                         context.dispatch('LOAD_SESSION', user[0]);
                                         context.service.read('list',payload, {}, function(err, res){
                                                 if(err){
                                                     return err;
                                                 }
                                                 context.dispatch('STORE_ARTICLES',{list:res});
                                                 context.getRouter().transitionTo('/');
                                                 done();
                                         })
                                    })
                                }
                         })
                    }else{
    	                context.service.read('LoadSession', payload, {up:1}, function(err, user){
    						 var user = user ? user[0] : null;
    						 context.dispatch('LOAD_SESSION', user[0]);
    	                     context.getRouter().transitionTo('/');
    	                     done();
    					})
                    }
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
			 userList[0].num > 0 ? userList[0].num-- : userList[0].num = 0;
             var index = _.findIndex(userList,function(val){
            	 return val.categoryId == categoryId
             })
             userList[index].num > 0 ? userList[index].num-- : userList[index].num = 0;
             context.service.update('category', payload, {up:1,list:userList}, function(err, res){
                    if(err){
                    	throw err;
                    }
                    if(res){
                    	context.dispatch('ADD_ARTICLE_SUCC',{});
                    	context.service.read('LoadSession', payload, {up:1}, function(err, user){
					         var user = user ? user[0] : null;
					         context.dispatch('LOAD_SESSION', user[0]);
					         context.service.read('list',payload, {}, function(err, res){
							         if(err){
							         	 return err;
							         }
							         res.length >  0 ? context.sessionStorage.set('list',res) : context.sessionStorage.set('list',[]);
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
	context.dispatch('LOAD_START',{})
	if(context.getStore(AuthStore).isLoginCookie()){
	    if(context.sessionStorage.get('list') && context.sessionStorage.get('list').length !== 0){
	    	var list = context.sessionStorage.get('list');
			context.dispatch('STORE_ARTICLES',{list:list});
			context.dispatch('LOAD_END',{})
			done();
	    }else{
	        context.service.read('list',payload, {}, function(err, res){
		         if(err){
		         	 return err;
		         }
		         res.length > 0 ? context.sessionStorage.set('list',res) : context.sessionStorage.set('list',[]);
				 context.dispatch('STORE_ARTICLES',{list:res})
				 context.dispatch('LOAD_END',{})
				 done();
		    })
	    }
	}else{
		context.dispatch('LOG_OUT',{})
		context.dispatch('LOAD_END',{});
		done();
	}

}

ListActions.GetAtricleOnce = function(context, payload, done){
	 context.dispatch('LOAD_START',{})
     var createTime = payload.createTime;
	 var list = context.sessionStorage.get('list');
	 var obj = {};
     var index_ = _.findIndex(list,function(val){
            	 return val.createTime == payload.createTime
          })
     if(list && index_ > -1){
     	  context.dispatch('GET_ATRICLE_ONE', {obj: list[index_]});
          index_ == 0 ? obj.prev = null : obj.prev = list[index_ - 1].createTime;
          index_ == list.length - 1 ? obj.next = null : obj.next = list[index_ + 1].createTime;
          context.dispatch('GET_ATRICLE_TAB_DATE',{val:obj});
          context.dispatch('LOAD_END',{})
     	  done();
     }else{
          context.service.read('list',payload, {createTime:createTime}, function(err, res){
		         if(err){
		         	 return err;
		         }
		         var index = _.findIndex(res,function(val){
	            	 return val.createTime == payload.createTime
	             })
                 context.dispatch('STORE_ARTICLES',{list:res})
		         context.sessionStorage.set('list',res);
				 context.dispatch('GET_ATRICLE_ONE',{obj:res[index]})
				 index == 0 ? obj.prev = null : obj.prev = res[index - 1].createTime;
		         index == res.length - 1 ? obj.next = null : obj.next = res[index + 1].createTime;
		         context.dispatch('GET_ATRICLE_TAB_DATE',{val:obj});
		         context.dispatch('LOAD_END',{})
				 done();
		   })
     }
}

ListActions.atricleTitleChange = function(context, payload, done){
     context.dispatch('ATRICLE_ONCHANGE_TITLE',payload.title);
     done();
}

ListActions.atricleContentChange = function(context, payload, done){
	context.dispatch('ATRICLE_ONCHANGE_CONTENT',payload.content);
    done();
}

module.exports = ListActions;