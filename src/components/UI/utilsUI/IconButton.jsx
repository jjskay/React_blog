import React from 'react';
import classSet from 'classnames';
import {Link, Navigation} from 'react-router';
let CheckBox = React.createClass({

    propTypes: {
        text: React.PropTypes.string,
        iconClass: React.PropTypes.string,
        navigationPath: React.PropTypes.string,
        bgColor: React.PropTypes.string
    },

    render() {
        var checkedClass = classSet({
            'iconfont': true,
            'ps-a': true
        },this.props.iconClass);
        return (
            <span style={{backgroundColor:this.props.bgColor}}>
                <i className={checkedClass}></i>
                <Link to={this.props.navigationPath}>{this.props.text}</Link>
            </span>
        );
    },
});

module.exports = CheckBox;
