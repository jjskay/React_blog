var React = require('react');

var classSet = require('classnames');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var {IntlMixin,FormattedMessage} = require('react-intl');

var AuthActions = require('../../../actions/AuthActions');
var AuthStore = require('../../../stores/AuthStore');
var ListActions = require('../../../actions/ListActions');
var ListStore = require('../../../stores/ListStore');

var FilterData = require('../../../utils/filterData')

var {FontIcon, ArticleList, AddCategory} = require('../utilsUI')

var FluxibleMixin = require('fluxible/addons/FluxibleMixin');

var UserIndex = React.createClass({

	prpoTypes: {
		menuStatus: React.PropTypes.bool,
		user: React.PropTypes.object,
		articleDelete: React.PropTypes.func,
    addModuleShow: React.PropTypes.func,
    addModule: React.PropTypes.bool,
    categoryIndex: React.PropTypes.number,
    deleteCategory: React.PropTypes.func,
    addCategory: React.PropTypes.func,
    categoryVisiable: React.PropTypes.bool,
    addCategroyError: React.PropTypes.string,
    addCategoryClose: React.PropTypes.func,
    addCategoryShow: React.PropTypes.func,
    articlesList: React.PropTypes.array,
    getcategoryList: React.PropTypes.func,

	},

	mixins: [FluxibleMixin, IntlMixin],

	render: function(){
        return (
           <div className="user-content">
                {this.listRender()}
                {this.userInfoRender()}
           </div>
        )
	},

	getUser: function(){
		this.context.executeAction(ListActions.GetList, {})
	},

	listRender: function(){
		var views;
		if(this.props.user.list.length > 0 && this.props.user.list[0].num > 0){
			views = (
               <div className="user-content-list">
                    <ArticleList list={this.props.articlesList} articleDelete={this.props.articleDelete} />
                    <p><Link to="/add">Add new article!</Link></p>
               </div>
			)
		}else{
			views = (
                <div className="user-content-list">
                    <span>IS NONE!</span>
                    <p><Link to="/add">Create Note!</Link></p>
                </div>
              );
		}
		return views;
	},

	// articleDelete: function(id,categoryId){
 //        this.props.articleDelete(id,categoryId);
	// },

	userInfoRender: function(){
		var menuClass = classSet({
			'menu':true,
			'active':this.props.addModule
		})
		return (
             <div className="user-content-nav">
                 <div className="user-name">
                     <span><i className="iconfont icon-user"></i>{this.props.user.username}</span>
                     <b onClick={this.addModuleShow}><i></i></b>
                     <div className={menuClass} onClick={this.addCategoryShow}>
                         <span className="show">
                              <FontIcon iconClass="icon-add" iconColor="blank" />
                                 Create Category
                         </span>
                     </div>
                     <AddCategory
                      addCategory={this.props.addCategory}
                      categoryVisiable={this.props.categoryVisiable}
                      addCategroyError={this.props.addCategroyError}
                      addCategoryClose={this.props.addCategoryClose}/>
                 </div>
                 <div className="user-nav-list">
                     {
                     	this.props.user.list && this.props.user.list.map((value, index) => {
                        var categoryActiveClass = classSet({
                          'active':value.categoryId == this.props.categoryIndex
                        })
                        var deleteCategory;
                        if(value.categoryId !== 0 && value.num <= 0){
                            deleteCategory = <span className="delete-category" onClick={this.deleteCategory.bind(this,value.categoryId)}>×</span>
                        }
                     		return (
                     				<span className={categoryActiveClass}  key={index}  onClick={this.getcategoryList.bind(this,value.categoryId)}>
                     					<FontIcon  iconClass='icon-search' iconColor="blank" />
                     					{value.categoryName}
                     					<i>{value.num}</i>
                              {deleteCategory}
                     				</span>
                     		)
                     	})
                     }
                 </div>
             </div>
		)
	},

	addModuleShow: function(){
        this.props.addModuleShow();
	},

  getcategoryList: function(id){
        this.props.getcategoryList(id);
  },

  deleteCategory: function(categoryId, categoryNum){
     this.props.deleteCategory(categoryId);
  },

  addCategoryShow: function(){
     this.props.addCategoryShow(true);
  }

})


module.exports = UserIndex;