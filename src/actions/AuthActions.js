var AuthActions = {};

AuthActions.LoadSession =  function(context, payload, done){
	var token = context.cookie.get('userid') || false;
	context.dispatch('LOAD_SESSION', token);
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
					    // done();
				})
		    }
		    // done();
	})



	done();
}

AuthActions.getInfo = function(context, payload, done){
   if(payload.value !== ''){
      context.service.update('user', payload, {username:payload.value}, function(err, user){
	        	if(user){
					context.dispatch('INSERT_SUCC', {});
		        }else{
		        	context.dispatch('INSERT_FAIL', {});
		        }
		        done();
		})
   }else{
   	  context.dispatch('GET_INFO_STATUS', true);
   }
}

AuthActions.getUser = function(context, payload, done){

    context.service.read('user', payload, {}, function(err, user){
        	if(user){
				context.dispatch('GET_LIST_SUCC', user);
	        }else{
	        	context.dispatch('GET_LIST_FAIL', {});
	        }
	        done();
	})
}


module.exports = AuthActions;






























