var React = require('react');
var classSet = require('classnames');
var { Route, RouteHandler, Link } = require('react-router');
var Tip = require('./Tip')
let HeaderNav = React.createClass({

    propTypes: {
        navData: React.PropTypes.array,
        onclickMenuShow: React.PropTypes.func,
        tabIndex: React.PropTypes.number,
        sginOut: React.PropTypes.func,
    },

    navContent(val,index){
    	 var menuIcon;
    	 var menuList;
    	 var tabSelectedClass = classSet({
    	 	 'nav-menu-list': true,
    	 	 'active': index == Number(this.props.tabIndex)
    	 })
    	 if(val.menu.length > 0){
    	 	menuIcon = <b className="page-menu-icon"></b>;
            menuList = (
                <div className={tabSelectedClass}>
                   {
                   	  val.menu.map((value,index) => {
                	      return <a href="#" key={index} onClick={this.sginOut}>{value.text}</a>
                	  })
                   }
                </div>
            )
    	 }
	     if(val.menu.length>0){
	        return (
                   <span>
                   		{val.text}
                   		{menuIcon}
                   		<Tip text={index} bgColor="red" />
                   		{menuList}
                   </span>
	        )
	     }else{
	        return (
		          <Link to="/">
		           		{val.text}
		           		{menuIcon}
		           		{menuList}
		           </Link>
	        )
	     }

    },

    onclickMenuShow(index,ev){
        this.props.onclickMenuShow(index,ev);
    },

    sginOut: function(e){
        e.preventDefault();
        this.props.sginOut();
    },

    render() {
        var checkedClass = classSet({

        });
        return (
             <div className="header-nav">
                 <ul>
                     {
	                 	this.props.navData.map((val,index) => {
	                        return (
			                        	<li key={index} onClick={this.onclickMenuShow.bind(this,index,val)}>
                                            {this.navContent(val,index)}
			                        	</li>
		                        	)
	                 	})
	                 }
                 </ul>
             </div>
        );
    },

});

module.exports = HeaderNav;
