/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');

// helpers
var helpers = require('../../../../helpers/common')();

// addons
var InfiniteScroll = require('react-infinite-scroll')(React);
var MasonryMixin = require('react-masonry-mixin');
var PackeryMixin = require('react-packery-mixin');
var Masonry = require('react-masonry-component')(React);

// options
var masonryOptions = {};

// sub-components
var Article = require('./article');

var goTop = require('../../utils').goTop;

var storeRead = require('../../utils').storeRead;

var _ = require('underscore');

module.exports = React.createClass({
    displayName: 'ArticleBox',

    mixins: [ReactAsync.Mixin, MasonryMixin('masonryContainer', masonryOptions)],

    lastPage: -1,
    afterDidMount: false,
    readedSet: {},

    componentWillReceiveProps: function (nextProps) {

        if (nextProps.category !== this.props.category) {
            this.initState()
        } else if ( nextProps.clearReadInfoFlag  ){
            this.initState()
            // 重置内存的数据
            this.readedSet = {}
            nextProps.setFalseClearReadInfoFlag()
        } 
        
    },
    componentDidMount: function(){
        // 限流为3s
        this.loadMore =  _.throttle( this.loadMoreArticles , 3000);
        this.afterDidMount = true;
        this.readedSet = storeRead()
    },
    initState: function(){
        this.lastPage = -1;
        this.setState({
            page: 0,
            articles: [],
            hasMore: true
        });
    },

    fetchNextArticles: function (page, perPage, callback) {
        this.props.api.entries.get({
            page: page,
            perPage: perPage,
            category: this.props.category
        }, callback);
    },

    getInitialStateAsync: function (callback) {
        callback(null, {
            page: 0,
            articles: [],
            hasMore: true
        });
    },

    includeLoadedArticles: function (page, articles) {
        this.setState({
            page: page + 1,
            articles: helpers.createUniqueArray(this.state.articles.concat(articles), 'guid'),
            hasMore: articles.length == this.props.perPage
        });
    },

    loadMoreArticles: function (page) {
            //! this.afterDidMount 
        if( this.lastPage >= page 
                || (page > 0 && this.state.articles.length === 0 )  // 第一个页面还有加载情况  第一次加载时候  等待时间比较长  会出现连续请求的情况
          ) {
            return  
        }
        this.lastPage = page;
        var mv = this;
        this.fetchNextArticles(page, this.props.perPage, function (err, articles) {
            if (err) return console.log(err);
            //获取新的文章列表  比较本地阅读的 将已经阅读的 标记出来
            var signReadArticles = articles.map(function(item){
                item.read =  mv.readedSet[item.guid] || false;
                return item ;
            }) 
            mv.includeLoadedArticles(page, signReadArticles );
        });
    },

    getLoaderElement: function () {
        return (
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                <div className='thumbnail article text-center'>Loading <i className='fa fa-cog fa-spin'></i></div>
            </div>
        );
    },

    wrapGoTop: function (e){
        goTop(0.5, 20); 
    },

    getArticlesToRender: function () {
        if(! this.state.articles ) {
            return  
        } else {
            var mv =  this 
            return this.state.articles.map(function (article) {
                return (
                    <Article
                        key={article.guid}
                        article={article}
                        hideImage={ mv.props.hideImage }
                        api={ mv.props.api }
                    />
                );
            });
        }
    },

    render: function () {
        return (
            <div className='container'>
                <div className='row'>
                    <div>
                        <InfiniteScroll 
                            ref='masonryContainer'
                            pageStart={this.state.page - 1}
                            loader={this.getLoaderElement()}
                            loadMore={this.loadMore }
                            hasMore={this.state.hasMore}
                            threshold={1000}
                        >
                            {/* 
                            <Masonry
                                elementType={'div'}
                                options={masonryOptions}
                            >
                                {this.getArticlesToRender()}
                            </Masonry>
                            */}
                            {this.getArticlesToRender()}
                        </InfiniteScroll>
                    </div>
                </div>
                <div className='topButton' onClick={ this.wrapGoTop } >
                    <i className="fa fa-angle-double-up fa-2x"  aria-hidden="true"></i>
                </div>
            </div>
        );
    }
});
