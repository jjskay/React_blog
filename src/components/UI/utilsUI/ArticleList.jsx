import React from 'react';
import classSet from 'classnames';
import FontIcon from './FontIcon';
import { Route, RouteHandler, Link } from  'react-router';
let ArticleList = React.createClass({

    propTypes: {
       list:React.PropTypes.array,
       articleDelete: React.PropTypes.func,
    },

    articleDelete: function(id,categoryId,createTime){
       this.props.articleDelete(id,categoryId,createTime);
    },

    render() {
        return (
             <div className="article-list">
                 {
                    this.props.list &&
                    this.props.list.map((val,index) => {
                        var cTime = '';
                        cTime+= new Date(val.createTime).getFullYear();
                        cTime+= '/';
                        cTime+= (Number(new Date(val.createTime).getMonth()) + 1) > 9 ? (Number(new Date(val.createTime).getMonth()) + 1) : '0'+(Number(new Date(val.createTime).getMonth()) + 1);
                        cTime+='/';
                        cTime+= new Date(val.createTime).getDate() > 9 ? new Date(val.createTime).getDate() : '0'+new Date(val.createTime).getDate();
                        cTime+= '    ';
                        cTime+= new Date(val.createTime).getHours() > 9 ? new Date(val.createTime).getHours() : '0'+new Date(val.createTime).getHours();
                        cTime+= ':';
                        cTime+= new Date(val.createTime).getMinutes() >9 ? new Date(val.createTime).getMinutes() : '0' + new Date(val.createTime).getMinutes();
                        cTime+= ':';
                        cTime+= new Date(val.createTime).getSeconds() >9 ? new Date(val.createTime).getSeconds() : '0' + new Date(val.createTime).getSeconds();
                    	return (
                            <div key={index} className="articles">
                                <Link to='viewArticle' params={{createTime:val.createTime}}>{val.title}</Link>
                                <b className="fr">category:{val.categoryName}</b>
                                <span>{cTime}</span>
                                <p className="article-manage">
                                    <span onClick={this.articleDelete.bind(this,val._id,val.categoryId,val.createTime)}><FontIcon iconClass="icon-delete" iconColor="black" />Delete</span>
                                    <Link to='edit' params={{createTime:val.createTime}}><FontIcon iconClass="icon-edit" iconColor="black" />Edit</Link>
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
