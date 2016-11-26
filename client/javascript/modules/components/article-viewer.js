/** @jsx React.DOM */

'use strict';

var React = require('react');

var ImageComponent = require('./image');

var routeParams = require('../../utils').routeParams;

module.exports = React.createClass({
    displayName: 'ArticleViewer',
    
    componentDidMount: function(){
        var params = routeParams();
        params.forEach(function(item){
            if( item.key === 'c') {
                switch (item.value) {
                    case 'frontend_bole':
                    case 'general_zhihu':
                        this.zhihuLeechImg();
                        break;
                    case 'frontend_xitu':
                        this.xiTuLeechImg();
                        break;
                    default:

                } 
            }
        }.bind(this) )
    },

    xiTuLeechImg: function(){
        // 稀土掘金图片的 延迟加载处理
       var imgs = document.getElementsByTagName('img');
       var i , img, len=imgs.length;
       for(i=0; i<len; i++) {
           img = imgs[i];
           if( img.dataset.src )  {
               //console.log( img.src )
               img.src = img.dataset.src 
               //console.log( img.src )
           }
       }
    },

    zhihuLeechImg: function(category){
       var imgs = document.getElementsByTagName('img');
       var i , img, len=imgs.length, sendImgs=[];
       for(i=0; i<len; i++) {
           img = imgs[i];
           if( img.src === '/logo.png' ) {
                continue; 
           }
           sendImgs.push( img.src );
       }
       this.props.api.images.get({
           category: category,
           imgs: sendImgs,
       },function(err, images){
           //替换images
           images.forEach(function(item){
               var i = 0;
               var img ;
               for(i=0; i<len; i++){
                    img = imgs[i]; 
                    if( img.src === item.origin ) {
                        img.src = item.url; 
                        break;
                    }
               }
           })  
       })
    },

    getImageElement: function () {
        var src;

        // use meta:og image if available
        if (this.props.article.content && this.props.article.content.image) {
            src = this.props.article.content.image;
        }

        // use default image if meta:og is missing
        if (!src && this.props.article.image) {
            src = this.props.article.image;
        }

        return src ? <ImageComponent forceUpdate={true} src={src} classes={'header-image'} /> : null;
    },

    getContentBody: function () {
        if (!this.props.article.content.body) return;
        return (
            <div 
                id='content' 
                className='limit-container bottom200' 
                rel='content'
                dangerouslySetInnerHTML={{__html: this.props.article.content.body}}
            >
            </div>
        ) 
    },

    render: function () {
        if (!this.props.article.content) this.props.article.content = {};

        return (
            <div>
                <div style={{ maxHeight: '400px', overflowY: 'hidden' }}>
                    {this.getImageElement()}
                </div>

                <div id='main' className='container'>
                    <div className='text-center header-title limit-container'>
                        <h1>{this.props.article.title}</h1>

                        <div className='text-center limit-container'>
                            <hr/>
                            <a href={this.props.article.url}>Visit the original</a>
                            <hr/>
                        </div>
                    </div>

                    {this.getContentBody()}
                </div>

            </div>
        );
    }
});
