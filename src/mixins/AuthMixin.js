/**
 * Created by navy on 15/6/7.
 */
var AuthStore = require('../stores/AuthStore');

var AuthMixin = {
    statics: {
        willTransitionTo: function (transition) {
            var isLogin = transition.context
                .getActionContext().getStore(AuthStore).isLoginCookie();
                console.log(isLogin)
            if (!isLogin) {
                transition.redirect('/');
            }
        }
    }
};

module.exports = AuthMixin;