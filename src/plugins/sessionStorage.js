/**
 * Created by hshen on 6/7/2015.
 */
var SessionStorage = require('../utils/sessionStorage');

module.exports = {
    name: 'SessionStoragePlugin',

    plugContext: function(options) {
        return {
            plugActionContext: function(actionContext) {
                actionContext.sessionStorage = new SessionStorage({
                    req: options.req,
                    res: options.res
                });
            }
        };
    }
};
