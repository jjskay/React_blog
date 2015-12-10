var React = require('react');
var classSet = require('classnames');

var TabContentTemplate = require('./TabContentTemplate');
var TabTitleTemplate = require('./TabTitleTemplate');

let Tabs = React.createClass({

    displayName:'Tabs',

    propTypes: {
    	initSelectIndex: React.PropTypes.number,
    	onActive: React.PropTypes.func
    },

    getInitialState(){

    },

    getTabCount() {

    },

    onChangeTab(tabIndex, tab){

    },

    onHoverEnter(){

    },

    onHoverLeave(){

    },

    render(){


        return (
            <div></div>
        )
    }

})

module.exports = Tabs;