var arrs = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var dataTime = new Date().getTime();

module.exports = function(){
	var v = '';
	for(let i=0;i<8;i++){
		v += arrs[Math.round(Math.random()*35)];
	}
	v+= dataTime.toString();
	return v;
}

























