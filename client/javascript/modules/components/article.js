/** @jsx React.DOM */

'use strict';

var React = require('react');

var helpers = require('../../../../helpers/common')();

var ImageComponent = require('./image');

var storeRead = require('../../utils').storeRead;


module.exports = React.createClass({
    displayName: 'Article',
    lastPage: -1,
    getInitialState: function(){
        return {
            image: null, 
            imageErr: 0 , //0 图片加载失败  1 imageB 加载失败  2 原始图片加载失败
        } 
    },
    getImageElement: function () {
        if( this.props.hideImage ) {
            return 
        }
        var src, imageB = false, originSrc;
        if ( this.state.imageErr !== 1   &&  this.props.article.imageB ) {
            src = this.props.article.imageB;
            src += this.props.supportWebp? 'webp' : '';
            imageB=true;
            originSrc = this.props.article.image;
        }

        // use meta:og image if available
        if (!src && this.props.article.content && this.props.article.content.image) {
            src = this.props.article.content.image;
        }

        // use default image if meta:og is missing
        if (!src && this.props.article.image) {
            src = this.props.article.image;
        }
         
        if( this.state.image ) {
            src = this.state.image; 
        }
        if( this.state.imageErr === 2 ) {
            src = null; 
        }
                //fetchListItemImage={this.fetchListItemImage.bind(this) }
        return src ? 
            <ImageComponent 
                src={src} 
                classes={'article-image'} 
                fetchListItemImage={ this.fetchListItemImage }
                handleError={ this.handleError }
                /> : null;
    },
    handleError: function(src) {
        var pa = this.props.article;
        var err = 0;
        if( pa.imageB  === src ) {
            // 使用imageB 且失败
            err = 1
        } else {
            err = 2
        } 
        this.setState({
            imageErr: err,
        })        
    },
    fetchListItemImage: function(src) {
        var id = this.props.article.url;
        this.props.api.images.listItem({
            id: id,
            src: src, 
        }, function(err, obj){
            if( err ) {
                console.error( err ) 
                return 
            }
            this.setState({
                image: obj.url 
            })        
        });
    },

    getTitle: function ()  {
        return (
            <h3 className='article-header'>
                {this.props.article.title}
            </h3>
        );
    },

    getDescription: function () {
        var description = this.props.article.description;
        return description ? <p className='article-description'>{description}</p> : null;
    },

    getSource: function () {
        var source = helpers.parseSource(this.props.article.url);
        return source ?
            (
                <p className='source'>
                    {source}
                    {
                        this.props.article.read &&  
                            <span className="article-source-read">
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                                已阅 
                            </span>
                    }
                </p> 
            )  
            : null;
    },

    getCreatedDate : function () {
        var date = ( new Date ( this.props.article.createdAt )).toLocaleDateString(); 
        if ( date ) {
            return (
                <div style={{float:'right'}}>
                    <time className="createdAt-date"> { date } </time>
                </div> 
            )
        }
    },

    getArticleLink: function () {
        var url =  this.props.article.url;
        if( this.props.article.content ) {
            url =  '/article/' + encodeURIComponent(this.props.article.url) + '?c=' + this.props.article.category.join('_');
        }
        return url;
    },

    goTo: function (){
        //TODO 将该项标为已读 
        var id = this.props.article.guid ;
        storeRead(id, true)
        window.location.href = this.getArticleLink() 
    },
    render: function () {
        return (
            <div 
                className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
                style={{ margin: '2px 0'}}
            >
                <a 
                    href="javascript:void" 
                    onClick={ this.goTo }   
                    className='thumbnail article'
                >
                    {this.getImageElement()}
                    <div className='caption caption-box'>
                        {this.getTitle()}
                        {this.getDescription()}
                        {this.getSource()}
                        {this.getCreatedDate()}
                    </div>
                </a>
            </div>
        );
    }
});
