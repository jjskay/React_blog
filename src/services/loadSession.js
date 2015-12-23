var _ = require('lodash');
import MongoClient from 'mongodb';
import serverConfig from '../configs/server';


var LoadSession = {
    name: 'LoadSession',
    read: function (req, resource, params, config, callback) {
    	var url = serverConfig.mongo.cash.url;
    	if(req.session.user && req.session.user.length > 0 && !params.obj){
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
    },

    update: function(req, resource, params, body, config, callback){
       var url = serverConfig.mongo.cash.url;
       var user = req.session.user;
        if (user == null) {
            callback(null, null);
            return;
        }
       MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_list');
           var query = {
                          categoryId: body.obj.categoryId,
                          categoryName: body.obj.categoryName,
                          createTime: body.obj.createTime,
                          title: body.obj.title,
                          content: body.obj.content,
                        }
           collection.updateOne({categoryId:query.categoryId},
            {$set:query},
            function(err, res){
               if(err){
                  db.close();
                  callback(err,null);
                  return;
               }
               db.close();
               callback(err, res);
           })
       })
    }
}


module.exports = LoadSession;