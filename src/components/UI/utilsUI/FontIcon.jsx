import React from 'react';
import classSet from 'classnames';
let FontIcon = React.createClass({

    propTypes: {
        iconClass: React.PropTypes.string,
        iconColor: React.PropTypes.string,
    },

    render() {
        var checkedClass = classSet({
            'iconfont': true,
            'show': true,
            'ps-a': true
        },this.props.iconClass,this.props.iconColor);
        return (
            <span className={checkedClass}></span>
        );
    },
});

module.exports = FontIcon;
