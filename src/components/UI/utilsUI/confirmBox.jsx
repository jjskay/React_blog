import React from 'react';
import classSet from 'classnames';
let ConfirmBox = React.createClass({

    propTypes: {
        messageStatus: React.PropTypes.bool,
        onclickBoxSure: React.PropTypes.func,
        onclickBoxCancel: React.PropTypes.func,
    },

    getDefaultProps(){
        return {
        	messageStatus: false,
        	onclickBoxSure: function(){},
        	onclickBoxCancel: function(){}
        }
    },

    render() {
        var showBox = classSet({
            'box-show': this.props.messageStatus,
            'confirm-box':true
        });
        return (
             <div className={showBox}>
                 <div>
                    <p className="box-title">Are you sure this operation?</p>
                    <p><span className="box-sure" onClick={this.onclickBoxSure}>Sure</span><span className="box-cancel" onClick={this.onclickBoxCancel}>Cancel</span></p>
                 </div>
             </div>
        );
    },

    onclickBoxSure: function(){
    	this.props.onclickBoxSure();
    },

    onclickBoxCancel: function(){
    	this.props.onclickBoxCancel()
    }
});

module.exports = ConfirmBox;
