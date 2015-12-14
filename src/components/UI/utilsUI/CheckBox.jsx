import React from 'react';
import classSet from 'classnames';
let CheckBox = React.createClass({

    propTypes: {
        rememberStatus: React.PropTypes.bool,
        text: React.PropTypes.string,
        rememberChecked: React.PropTypes.func,
        iconClass: React.PropTypes.string
    },

    render() {
        var checkedClass = classSet({
            'remember-password': this.props.rememberStatus,
            'password-checkbox': true,
            'iconfont': true,
        });
        return (
             <label onClick={this.props.rememberChecked}>
                 <span className={checkedClass}></span>
                 {this.props.text}
             </label>
        );
    },
});

module.exports = CheckBox;
