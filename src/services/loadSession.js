var _ = require('lodash');
import MongoClient from 'mongodb';
import serverConfig from '../configs/server';


var LoadSession = {
    name: 'LoadSession',
    read: function (req, resource, params, config, callback) {
         var user = req.session.user;
         callback(null, user == null ? null : user);
    }
}


module.exports = LoadSession;