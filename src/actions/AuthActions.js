var AuthActions = {};

AuthActions.LoadSession =  function(context, payload, done){
	var token = context.cookie.get('uuid')
	context.dispatch('LOAD_SESSION', token);

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






























