var _ = require('lodash');
import MongoClient from 'mongodb';
import serverConfig from '../configs/server';


var ListService = {
    name: 'list',
    read: function (req, resource, params, config, callback) {
         var user = req.session.user;
         console.log(user)
         callback(null, user == null ? null : user);
    }
}


module.exports = ListService;