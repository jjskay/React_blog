var _ = require('lodash');
import MongoClient from 'mongodb';
import serverConfig from '../configs/server';


var CategoryService = {
    name: 'category',
    update: function(req, resource, params, body, config, callback){
       var url = serverConfig.mongo.cash.url;
       var username = req.session.user[0].username;
       var list = req.session.user[0].list;
       var obj = {
       	   categoryName:body.name,
       	   categoryId:body.id,
       	   num:0
       }
       list.push(obj);
       MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_user');
           collection.updateOne({username:username},{$set:{list:list}},function(err, res){
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
       var url = serverConfig.mongo.cash.url;
       var username = req.session.user[0].username;
       var id = params.id;
       var list = req.session.user[0].list;
       var arr = _.remove(list,function(val){
       	   return val.categoryId == id;
       })
       MongoClient.connect(url, function(err, db){
           var collection = db.collection('collection_user');
           collection.updateOne({username:username},{$set:{list:list}},function(err, res){
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


module.exports = CategoryService;