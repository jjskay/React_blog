var React = require('react');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var AuthStore = require('../../../stores/AuthStore');
var AuthActions = require('../../../actions/AuthActions');

import FluxibleMixin from 'fluxible/addons/FluxibleMixin';
import classSet from 'classnames';

var PublicSlider = React.createClass({

	prpoTypes: {
		imgArr: React.PropTypes.array,
		textArr: React.PropTypes.array
	},

	statics: {
		storeListeners: [AuthStore]
	},

	mixins: [FluxibleMixin],

	getInitialState: function(){
		return this.getStateFromStores();
	},

	getStateFromStores: function(){
		return {
			imgArr: ["127.0.0.1:3005/img/splash_background.jpg","127.0.0.1:3005/img/splash_background.jpg"],
			textArr:[],
			index: 0
		}
	},

	componentDidMount: function(){
        this.sliderAuto();
	},

	onChange: function(){
		this.setState(this.getStateFromStores());
	},

	render: function(){
		var _ = this;
        return (
           <div className="slider-auto" onMouseEnter={this.sliderEnter} onMouseLeave={this.sliderLeave}>
               <div className="slider-pic">
                    {
		               	 this.props.imgArr.map((val,i) => {

			               	 	 var sliderItemClass = classSet({
									'slider-img': true,
									'add-active': this.state.index == i,
									'remove-active': this.state.index !== i
								})
			               	 	 var styleVal = 'url("'+val+'")';
			                    return (
			                        <div key={i} className={sliderItemClass} style={{'backgroundImage':'url("'+val+'")'}}></div>
			                    )
			               	 })
		               }
               </div>
               <div className="slider-val">
                    {
                    	this.props.textArr.map((val,i) => {

                             var sliderTextClass = classSet({
                             	'slider-text': true,
                             	'add-active': this.state.index == i,
								'remove-active': this.state.index !== i
                             })
                             return (
                                <span key={i} className={sliderTextClass}>{val}</span>
                             )
                    	})
                    }
               </div>
               <span className="scroll-button scroll-prev" onClick={_.sliderPrev}>Prev</span>
               <span className="scroll-button scroll-next" onClick={_.sliderNext}>Next</span>
           </div>
        )
	},

	sliderAuto: function(){
		var _ = this;
		_.id = setInterval(function(){
			_.sliderNext();
		},7000)
	},

	sliderPrev: function(){
        var len = this.props.textArr.length - 1;
        var i = this.state.index;
        i < 1 ? i = len : i--;
        this.setState({index:i});
	},

	sliderNext: function(){
        var len = this.props.textArr.length - 2;
        var i = this.state.index;
        i > len ? i = 0 : i++;
        this.setState({index:i});
	},

	sliderEnter: function(){
		var _ = this;
        clearInterval(_.id);
	},

	sliderLeave: function(){
        this.sliderAuto();
	}

})


module.exports = PublicSlider;