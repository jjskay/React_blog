import React from 'react';
import classSet from 'classnames';
var FontIcon = require('./FontIcon')

let AddCategory = React.createClass({

    propTypes: {
        addCategory: React.PropTypes.func,
        categoryVisiable: React.PropTypes.bool,
        addCategroyError: React.PropTypes.string,
        addCategoryClose: React.PropTypes.func,
    },

    render() {
        var checkedClass = classSet({
            'active': this.props.categoryVisiable,
            'categoryBox': true
        });
        return (
             <div className={checkedClass}>
                 <div>
                        <div className="category-name"><label>Category name:<input ref="categoryName" type="text" placeholder="Please enter category name!" /></label></div>
                         <div className="add-category-error">{this.props.addCategroyError}</div>
                         <div className="sure-add-category">
                             <span onClick={this.addCategorySubmit}>
                                 <FontIcon iconClass="icon-add" iconColor="blank" />
                                 <b>Add</b>
                             </span>
                             <span onClick={this.addCategoryClose}>×<b>cancel</b></span>
                         </div>
                 </div>
             </div>
        );
    },

    addCategorySubmit: function(){
        var val = React.findDOMNode(this.refs.categoryName).value.replace(/(^\s+)|(\s+$)/g, "");
        this.props.addCategory(val);
    },

    addCategoryClose: function(){
        this.props.addCategoryClose(false);
    }

});

module.exports = AddCategory;
