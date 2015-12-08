var env = require('./env');

var SessionStorage;
var SessionStorageFun = function(){};
var FakeStorage = function(){};

FakeStorage.prototype.get = function(){
	return null;
}

FakeStorage.prototype.set = function(){
	return null;
}

FakeStorage.prototype.delete = function(){
	
}

SessionStorageFun.prototype.get = function(name){
	if(!sessionStorage.getItem(name)){
		return null;
	}
	var wapSession = JSON.parse(sessionStorage.getItem(name));
	return wapSession;
}


SessionStorageFun.prototype.set = function(name,val){
	var value = JSON.stringify(val);
	sessionStorage.setItem(name, value);
}

SessionStorageFun.prototype.delete = function(name){
	sessionStorage.removeItem(name);
}

SessionStorageFun.prototype.clear = function(){
	sessionStorage.clear();
}

if (env.CLIENT) {
    SessionStorage = SessionStorageFun;
}else{
	SessionStorage = FakeStorage;
}

export default SessionStorage;






















