var AuthActions = {};
var AuthStore = require('../stores/AuthStore');
var ListStore = require('../stores/ListStore');

AuthActions.LoadSession =  function(context, payload, done){
	if(!context.sessionStorage.get('list')){
		context.sessionStorage.set('list',[]);
	}
	context.service.read('LoadSession', payload, {}, function(err, user){
         var user = user ? user[0] : null;
         context.dispatch('LOAD_SESSION', user);
		done();
	})
}

AuthActions.CategoryIndexChange  = function(context, payload, done){
    context.dispatch('CATEGORY_INDEX_CHANGE',{id:payload.id});
    done();
}

AuthActions.Reg = function(context, payload, done){
	context.dispatch('REG_START',{});
    var obj = payload.obj;

	context.service.read('user', payload, {username:obj.username}, function(err, user){
	      if(user.length > 0){
	      	    context.dispatch('REG_FAIL', {err:'The user name is already registered!'});
		    }else{
		     	context.service.update('user', payload, {username:obj.username,password:obj.password}, function(err, user){
				      if(user){
				      	    context.dispatch('REG_SUCC', {user:user});
					    }else{
					     	context.dispatch('REG_FAIL', {err:'server error!'});
					    }
				})
		    }
			done();
	})

}

AuthActions.Login = function(context, payload, done){
    context.dispatch('LOGIN_START',{});
    context.getStore(AuthStore).initialize();
    context.getStore(ListStore).initialize();
    context.service.read('user', payload, {obj:payload.obj}, function(err, user){
       if(user.length > 0){
       	   context.dispatch('LOGIN_SUCC',{});
       	   context.dispatch('LOAD_SESSION', user[0]);
       	   context.getRouter().transitionTo('/');
       }else{
       	   context.dispatch('LOGIN_FAIL',{});
       }
      done();
    })
}

AuthActions.LogOut = function(context, payload, done){
	context.service.delete('user', payload, function(err){
	   context.sessionStorage.delete('list');
       context.dispatch('LOG_OUT');
       done();
	})
}

module.exports = AuthActions;






























