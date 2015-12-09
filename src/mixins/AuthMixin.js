/**
 * Created by navy on 15/6/7.
 */
var AuthStore = require('../stores/AuthStore');

var AuthMixin = {
    statics: {
        willTransitionTo: function (transition) {
            var isLoginCookie = transition.context
                .getActionContext().getStore(AuthStore).isLoginCookie();
            if (!isLoginCookie) {
                transition.redirect('/login');
            }
        }
    }
};

module.exports = AuthMixin;