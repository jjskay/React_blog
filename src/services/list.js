var _ = require('lodash');
import MongoClient from 'mongodb';
import serverConfig from '../configs/server';


var ListService = {
    name: 'list',
    read: function (req, resource, params, config, callback) {
        var user = req.session.user;
        if (user == null) {
            callback(null, null);
            return;
        }
        var url = serverConfig.mongo.cash.url;
        MongoClient.connect(url, function(err, db){
             var collection = db.collection('collection_list');
             collection.find({username:user[0].username}).toArray((err, res) => {
                if(err){
                  db.close();
                  callback(err, null)
                  return;
                }
                db.close();
                callback(err, res);
             })
         })
    },

    create: function(req, resource, params, body, config, callback){
       var url = serverConfig.mongo.cash.url;
       MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_list');
           collection.insertMany([body.obj],function(err, res){
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

    update: function(req, resource, params, body, config, callback){
       var url = serverConfig.mongo.cash.url;
       var user = req.session.user;
        if (user == null) {
            callback(null, null);
            return;
        }
       MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_user');
           collection.updateOne({_id:body.id},
           		{$set:{title:body.title}},function(err, res){
               if(err){
                  db.close();
                  callback(err,null);
                  return;
               }
               req.session.user = res.ops;
               db.close();
               callback(err, res);
           })
       })
    },

    delete: function (req, resource, params, config, callback) {
      var url = serverConfig.mongo.cash.url;
       var user = req.session.user;
        if (user == null) {
            callback(null, null);
            return;
        }
        var query = {createTime:params.createTime};
        MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_list');
           collection.deleteOne(query,
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


module.exports = ListService;