import React from 'react';
import classSet from 'classnames';
let TabTemplate = React.createClass({

    propTypes: {
        selected: React.PropTypes.bool
    },

    render() {
        var itemClassName = classSet({
            'tab-content-item': true,
            'selected': this.props.selected
        });
        return (
            <div className={itemClassName} >
                {this.props.children}
            </div>
        );
    },
});

module.exports = TabTemplate;
