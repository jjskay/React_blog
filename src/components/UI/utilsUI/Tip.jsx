import React from 'react';
import classSet from 'classnames';
let Tip = React.createClass({

	displayName: 'Tip',

    propTypes: {
        text: React.PropTypes.number,
        bgColor: React.PropTypes.string,
    },

    getInitialState(){
        return {
        	text: this.props.text,
        	bgColor: this.props.bgColor
        }
    },

    getDefaultProps() {
        return {
        	text: 0,
        	bgColor: 'red'
        }
    },

    render() {
        var checkedClass = classSet({
            'iconfont': true,
            'ps-a': true,
            'text-center': true,
            'icon-tip': true
        },this.props.bgColor);
        return (
            <span className={checkedClass}>
                 {this.props.text}
            </span>
        );
    },
});

module.exports = Tip;
