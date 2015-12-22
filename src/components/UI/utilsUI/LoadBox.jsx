import React from 'react';
import classSet from 'classnames';
let LoadBox = React.createClass({

    propTypes: {
        loadStatus: React.PropTypes.bool
    },

    loadBox: function(){
        if(this.props.loadStatus){
           return (
              <div className="load-box"></div>
           )
        }else{
        	return '';
        }
    },

    render() {
        return (
             <div>
                 {this.loadBox()}
             </div>
        )
    },
});

module.exports = LoadBox;
