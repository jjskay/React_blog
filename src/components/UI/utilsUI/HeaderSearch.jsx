import React from 'react';
import classSet from 'classnames';
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

let HeaderSearch = React.createClass({

    propTypes: {
        searchDataHot: React.PropTypes.array,
        searchStatus: React.PropTypes.bool,
        onfocusShow: React.PropTypes.func
    },

    propShow(){
        this.props.onfocusShow(true);
    },

    propHide(){
        this.props.onfocusShow(false);
    },

    render() {
        var propClass = classSet({
            'search-hot-div': true,
            'active': this.props.searchStatus
        });
        return (
             <div className="nav-search">
                 <input type="search"
                    placeholder="Enter the content you want to search"
                    onBlur={this.propHide}
                    onFocus={this.propShow}/>
                  <div className={propClass}>
                      {
                      	this.props.searchDataHot.map((val,index) => {
                      		return <Link key={index} to={val.path}>{val.text}</Link>
                      	})
                      }
                  </div>
             </div>
        );
    },
});

module.exports = HeaderSearch;
