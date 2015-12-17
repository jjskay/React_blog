import React from 'react';
import classSet from 'classnames';
import FontIcon from './FontIcon';
import { Route, RouteHandler, Link } from  'react-router';
let ArticleList = React.createClass({

    propTypes: {
       list:React.PropTypes.array,
       articleDelete: React.PropTypes.func,
    },

    articleDelete: function(id){
       this.props.articleDelete(id);
    },

    render() {
        return (
             <div className="article-list">
                 {
                    this.props.list &&
                    this.props.list.map((val,index) => {
                    	return (
                            <div key={index} className="articles">
                                <Link to={val.path}>{val.title}</Link>
                                <span>{val.createTime}</span>
                                <p className="article-manage">
                                    <span onClick={this.articleDelete.bind(this,val.id)}><FontIcon iconClass="icon-delete" iconColor="black" />Delete</span>
                                    <Link to={val.id}><FontIcon iconClass="icon-edit" iconColor="black" />Edit</Link>
                                </p>
                            </div>
                    	)
                    })
                 }
             </div>
        );
    },
});

module.exports = ArticleList;
