/**
 * @jsx React.DOM
 */
'use strict';

// config
var config = require('./config');
var api = require('./modules/api')(config);

// dependencies
var React = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');

// custom components
var ArticleBox = require('./modules/components/article-box');
var CategorySelecter = require('./modules/components/category-selecter');
var Head = require('./modules/components/head');
var Header = require('./modules/components/header');
var ExternalScripts = require('./modules/components/external-scripts');


var clearStoreRead = require('./utils').clearStoreRead;
var storeSelect = require('./utils').storeSelect;
var storeHideImage = require('./utils').storeHideImage;


var isSupportWebp = require('./utils').isSupportWebp;

// Main page component (this is asyncronous)
var App = React.createClass({
    displayName: 'MainApp',

    mixins: [ReactAsync.Mixin],

    getInitialStateAsync: function (callback) {
        callback(null, this.props); // set the input props as state (equal to 'return this.props' in getInitialState, but async)
    },

    componentDidMount: function(){
        var defaultSel = storeSelect() ;
        var hideImage = storeHideImage() || false;
        if( defaultSel )  {
            var category = defaultSel.value;
            this.setState({ 
                category: category,
                hideImage: hideImage,
            });
        }
        var mv = this;
        isSupportWebp().then(function(result){
            mv.setState({
                supportWebp: result 
            }) 
        })
    },


    changeCategory: function (category) {
        this.setState({ 'category': category });
    },

    clearReadInfo: function () {
        clearStoreRead();
        this.setState({ 'clearReadInfoFlag': true});
    },

    setFalseClearReadInfoFlag: function () {
        this.state.clearReadInfoFlag = false;
    },

    toggleHideImage : function () {
        var cur = storeHideImage() || false ;
        cur = !cur 
        storeHideImage(cur)
        this.setState({ 'hideImage': cur});
    },

    // main rendering function (uses the state of the component, not the props)
    render: function() {
        return (
            <html>
                <Head title={this.state.title} description={this.state.description} />
                <body id='reactapp'>
                    <div id='wx_pic' style={{ margin:'0 auto', display:'none'}}>
                        <img src='/luobin.jpg'/>
                    </div>


                    <Header 
                        title={this.state.title} 
                        clearReadInfo={this.clearReadInfo } 
                        toggleHideImage={this.toggleHideImage}
                        hideImage={ this.state.hideImage } 
                    />
                    <CategorySelecter categories={this.state.categories} changeCategory={this.changeCategory} />
                    <ArticleBox 
                        api={api} 
                        perPage={15} 
                        category={this.state.category} 
                        clearReadInfoFlag={this.state.clearReadInfoFlag} 
                        setFalseClearReadInfoFlag={ this.setFalseClearReadInfoFlag }
                        hideImage={ this.state.hideImage } 
                        supportWebp={this.state.supportWebp }
                    />
                    <ExternalScripts />
                </body>
            </html>
        );
    }
});


module.exports = App;

// If the file is processed by the browser, it should mount itself to the document and 'overtake' the markup from the server without rerendering
if (typeof window !== 'undefined') {
    // enable the react developer tools when developing (loads another 450k into the DOM..)
    if (config.environment == 'development') {
        window.React = require('react');
    }

    window.onload = function () {
        React.renderComponent(App(), document);
    }
}
