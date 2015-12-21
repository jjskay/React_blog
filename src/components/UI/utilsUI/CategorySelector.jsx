import React from 'react';
import classSet from 'classnames';
let CategorySelector = React.createClass({

    propTypes: {
        categoryList: React.PropTypes.object,
        categoryShow: React.PropTypes.bool,
    },

    componentWillReceiveProps(){
    	this.props.categoryList && this.props.categoryList.list.map((val,index) => {
    		if(1 == index){
                 this.val =  val.contegoryName;
                 this.id = val.categoryId;
    		}
    	})
    },

    menu(){
    	var categoryMenu = classSet({
            'category-seletor-menu': true,
            'active': this.props.categoryShow
        });
        return(
        	<div className={categoryMenu}>
                {
                	this.props.categoryList && this.props.categoryList.list.map((val,index) => {
                		return <p onClick={this.seletedChange.bind(this,val.categoryId)}>{val.categoryName}</p>
                	})
                }
        	</div>
        )
    },

    seletedChange(id){
        this.id = id;
    },

    render() {
        return (
             <div className="category-seletor">
                 <div ref="categorySeleted" className="category-seleted">{this.val}</div>
                 {this.menu()}
             </div>
        );
    },
});

module.exports = CategorySelector;
