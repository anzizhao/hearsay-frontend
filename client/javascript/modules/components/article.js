/** @jsx React.DOM */

'use strict';

var React = require('react');

var helpers = require('../../../../helpers/common')();

var ImageComponent = require('./image');

var storeRead = require('../../utils').storeRead;

module.exports = React.createClass({
    displayName: 'Article',

    getImageElement: function () {
        if( this.props.hideImage ) {
            return 
        }

        var src;

        // use meta:og image if available
        if (this.props.article.content && this.props.article.content.image) {
            src = this.props.article.content.image;
        }

        // use default image if meta:og is missing
        if (!src && this.props.article.image) {
            src = this.props.article.image;
        }

        return src ? <ImageComponent src={src} classes={'article-image'} /> : null;
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
        return this.props.article.content ? '/article/' + encodeURIComponent(this.props.article.url) : this.props.article.url;
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
                <a href="javascript:void" onClick={ this.goTo }   className='thumbnail article'>
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
