var _ = require('lodash');
import MongoClient from 'mongodb';
import serverConfig from '../configs/server';


var LoadSession = {
    name: 'LoadSession',
    read: function (req, resource, params, config, callback) {
    	var url = serverConfig.mongo.cash.url;
    	if(!params.obj && req.session.user){
             MongoClient.connect(url, function(err, db){
		           var collection = db.collection('collection_user');
		           var query;
		           query = {'username':req.session.user[0].username};
		           collection.find(query).toArray((err, res) => {
		              if(err){
		                db.close();
		                callback(err, null)
		                return;
		              }
		              req.session.user = res;

		              db.close();
		              callback(err, req.session.user);
		           })
		       })
    	}else{
	         var user = req.session.user;
	         callback(null, user == null || user.length == 0 ? null : user);
    	}
    }
}


module.exports = LoadSession;