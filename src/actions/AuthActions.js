var AuthActions = {};

AuthActions.LoadSession =  function(context, payload, done){
	context.service.read('LoadSession', payload, {}, function(err, user){
         var token = user ? null : user;
         context.dispatch('LOAD_SESSION', token);
	})
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
	})



	done();
}

AuthActions.Login = function(context, payload, done){
    context.dispatch('LOGIN_START',{});
    context.service.read('user', payload, {obj:payload.obj}, function(err, user){
       if(user.length > 0){
       	   context.dispatch('LOGIN_SUCC',{user:user[0]});
       	   context.dispatch('LOAD_SESSION', user[0]);
       }else{
       	   context.dispatch('LOGIN_FAIL',{});
       }
    })
    done();
}


module.exports = AuthActions;






























