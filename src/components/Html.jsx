var React = require('react');
var { provideContext, connectToStores } = require('fluxible/addons');

var Html = React.createClass({
    
    getInitialState: function(){
       return {
       	   title: 'Blog'
       }
    },

	render: function(){
		return (
           <html>
              <head>
                 <meta charSet="utf-8"/>
                 <title>{this.state.title}</title>
                 <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, initial-scale=1"/>
                 <link href="/css/style.css" rel="stylesheet" type="text/css" />
              </head>
              <body>
                 <div id="body" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                 <script dangerouslySetInnerHTML={{__html: this.props.exposed}}></script>
                 <script src={this.props.assets.common}></script>
                 <script src={this.props.assets.main}></script>
              </body>
           </html>
		)
	}
})

Html = provideContext(Html);

module.exports = Html;





















