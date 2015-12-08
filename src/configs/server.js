import config from './'
var serverConfig = {
    mongo: {
        session: {
            url: 'mongodb://localhost/mongosession',
            ttl: 60 * config.userProfileExpire//20 min
        },
        cash: {
            url: 'mongodb://localhost/cash',
        },
        userActivity: {
            url: 'mongodb://localhost/diuseractivity'
            , schemaVersion: 2
        }
    },
    server: {
        addr: '',
        port: 3005,

        // user activity logger
        logUserActivity: true,

        //enable logger middleware ,it should set to false on production env
        enableLog:true
    }

};
module.exports = serverConfig;