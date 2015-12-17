var FilterData = require('../utils/filterData');

module.exports = {
    name: 'FilterDataPlugin',

    plugContext: function(options) {
        return {
            plugActionContext: function(actionContext) {
                actionContext.filterData = new FilterData({
                    req: options.req,
                    res: options.res
                });
            }
        };
    }
};
