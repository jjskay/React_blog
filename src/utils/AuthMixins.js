
var AuthStore = require('../stores/AuthStore');

module.exports = {
    statics: {
        willTransitionTo: function (transition) {
            var isAuthenticated = transition.context
                .getActionContext().getStore(AuthStore).isLoginCookie();
            if (!isAuthenticated) {
                transition.redirect('/');
            }
        }
    }
};
