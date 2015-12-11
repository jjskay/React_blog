import React from 'react';
import classSet from 'classnames';

import TabTemplate from './TabTemplate';


let Tabs = React.createClass({

    propTypes: {
        initialSelectedIndex: React.PropTypes.number,
        onActive: React.PropTypes.func
    },

    getInitialState(){
        let selectedIndex = 0;
        if (this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.getTabCount()) {
            selectedIndex = this.props.initialSelectedIndex;
        }
        return {
            selectedIndex: selectedIndex,
            hoverIndex: null
        };
    },

    getTabCount() {
        return React.Children.count(this.props.children);
    },

    onChangeTab(tabIndex, tab){
        if (this.props.onChange && this.state.selectedIndex !== tabIndex) {
            this.props.onChange(tabIndex, tab);
        }
        this.setState({selectedIndex: tabIndex});
        //default CB is _onActive. Can be updated in tab.jsx
        if (tab.props.onActive) tab.props.onActive(tab);
    },

    onHoverEnter(tabIndex, tab) {
        window.location.hash = '';
        if(tabIndex !== this.state.hoverIndex){
            this.setState({hoverIndex: tabIndex});
        }
    },

    onHoverLeave(){
        this.setState({hoverIndex: null});
    },

    render() {
        let tabContent = [];

        let tabs = React.Children.map(this.props.children, (tab, index) => {
            if (tab.type.displayName === "Tab") {
                if (tab.props.children) {
                    tabContent.push(React.createElement(TabTemplate, {
                        key: index,
                        selected: this.state.selectedIndex === index,
                        hover: this.state.hoverIndex === index
                    }, tab.props.children));
                }
                else {
                    tabContent.push(undefined);
                }

                return React.addons.cloneWithProps(tab, {
                    key: index,
                    selected: this.state.selectedIndex === index,
                    tabIndex: index,
                    onChangeTab: this.onChangeTab,
                    hovered: this.state.hoverIndex === index,
                    onHoverEnter: this.onHoverEnter,
                    onHoverLeave: this.onHoverLeave
                });
            }
            else {
                let type = tab.type.displayName || tab.type;
                throw 'Tabs only accepts Tab Components as children. Found ' +
                type + ' as child number ' + (index + 1) + ' of Tabs';
            }
        }, this);

        return (
            <div className='tab-container'>
                <div className='tab-bar'>
                    {tabs}
                </div>
                <div className='tab-content'>
                    {tabContent}
                </div>
            </div>
        );
    }
});

module.exports = Tabs;

