var _ = require('lodash');
import MongoClient from 'mongodb';
import serverConfig from '../configs/server';


var UserService = {
    name: 'user',
    read: function (req, resource, params, config, callback) {
       var url = serverConfig.mongo.cash.url;
       var sessionUser = req.session;
       MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_user');
           var query;
           if(params.obj.password){
              query = {'username':params.obj.username,'password':params.obj.password};
           }else{
              query = {'username':params.obj.username}
           }
           collection.find(query).toArray((err, res) => {
              if(err){
                db.close();
                callback(err, null)
                return;
              }
              req.session.user = res;
              db.close();
              callback(err, res);
           })
       })

    },
    update: function(req, resource, params, body, config, callback){
       var url = serverConfig.mongo.cash.url;
       MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_user');
           collection.insertMany([{'username':body.username,'password':body.password,list:[{categoryName:'All',categoryId:0,num:0}]}],function(err, res){
               if(err){
                  db.close();
                  callback(err,null);
                  return;
               }
               db.close();
               callback(err, res);
           })
       })
    },
    delete: function (req, resource, params, config, callback) {
        req.session.destroy(function (err) {
            callback(err);
        })
    }
}


module.exports = UserService;