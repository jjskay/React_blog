import React from 'react';
import classSet from 'classnames';
let Tab = React.createClass({

    propTypes: {
        onChangeTab: React.PropTypes.func,
        selected: React.PropTypes.bool,
        right: React.PropTypes.bool,
        hovered: React.PropTypes.bool,
        onHoverEnter: React.PropTypes.func,
        onHoverLeave: React.PropTypes.func
    },

    onChangeTab() {
        this.props.onChangeTab(this.props.tabIndex, this);
    },

    onHoverEnter() {
        this.props.onHoverEnter(this.props.tabIndex, this);
    },

    onHoverLeave() {
        this.props.onHoverLeave();
    },

    recursiveItem(items, level) {

        if (items && items.length > 0) {
            return (
                <ul>
                    {
                        items.map((v, i) => {
                            var layer = level + 1;
                            return (
                                <li key={i}>
                                    <a title={v.text} className={"tab-menu-level"+level} href={v.href?v.href:'#'}>{v.text}</a>
                                    {this.recursiveItem(v.items, layer)}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        } else {
            return null;
        }
    },

    render() {
        var itemClassName = classSet({
            'tab-item': true,
            'selected': this.props.selected,
            'hover': this.props.hovered,
            'right': this.props.label.right
        });
        return (
            <div className={itemClassName} onMouseEnter={this.onHoverEnter} onMouseLeave={this.onHoverLeave}
                 onClick={this.onChangeTab}>
                {this.props.label.href ? (
                    <a href={this.props.label.href}>{this.props.label.title}</a>
                ) : (
                    <span>{this.props.label.title}</span>
                )}
                {this.props.label.menu && (
                    <div className="tab-menu"
                         onClick={this.onHoverLeave}>{this.recursiveItem(this.props.label.menu, 0)}</div>
                )}

            </div>
        );
    },

});

module.exports = Tab;
