var wapGetCookie = {};

wapGetCookie.get = function(name){
	var cookie = document.cookie;
	var cookieArr = cookie.split(';');
	var i = '';
	for(var k=0;k<cookieArr.length;k++){
		if(cookieArr[k].indexOf(name) > -1){
			i = k;
		}
	}
	return i !== '' ? cookieArr[i].split('=')[1] : '';
}




module.exports = wapGetCookie;








