import React from 'react';
import classSet from 'classnames';
let CategorySelector = React.createClass({

    propTypes: {
        categoryList: React.PropTypes.object,
        categorySelectFunc: React.PropTypes.func,
        categorySelected: React.PropTypes.object,
        categoryGetVal: React.PropTypes.func,
    },

    menu(){
    	var categoryMenu = classSet({
            'category-seletor-menu': true,
            'active': this.props.categorySelected.bool
        });

        var value;
        if(this.props.categoryList && this.props.categoryList.list.length > 1){
            value = (
                 <div className={categoryMenu}>
                     {
                        this.props.categoryList.list.map((val,index) => {
                                if(val.categoryId !== 0){
                                    return <p onClick={this.seletedChange.bind(this,val.categoryId,val.categoryName)}>{val.categoryName}</p>
                                }
                        })
                     }
                 </div>
            )

        }else{
            value = (<div className={categoryMenu}><p style={{color:"red"}}>Please create at least one category.</p></div>);
        }
        return value;
    },

    seletedChange(id,categoryName){
        this.props.categoryGetVal(id,categoryName);
    },

    selectMenuShow: function(){
        this.props.categorySelectFunc(this.props.categorySelected.bool);
    },

    render() {
        return (
             <div className="category-seletor">
                 <div ref="categorySeleted" className="category-seleted" onClick={this.selectMenuShow}>
                 	{this.props.categorySelected.name}
                 	<b></b>
                 </div>
                 {this.menu()}
             </div>
        );
    },
});

module.exports = CategorySelector;
