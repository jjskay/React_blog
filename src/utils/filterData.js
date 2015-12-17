/**
 * Created by hshen on 6/7/2015.
 */
var _ = require('lodash');

function FilterData() {};

FilterData.prototype.category = function(list){
    return _.keys(list);
}

FilterData.prototype.categoryValueList = function(list, category){
    return _.values(list.category)
}

FilterData.prototype.allList = function(list){
	var arr = [];
	_.forEach(list,(val,index) => {
		_.values(val).push(arr);
	})
	return arr;
}

module.exports = FilterData;
