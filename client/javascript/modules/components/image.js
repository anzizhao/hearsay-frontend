/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'Image',

    getInitialState: function(){
        return {
            src: null, 
        } 
    },

    componentWillReceiveProps: function(np) {
        this.setState({
            src: np.src 
        })
    },

    onError: function () {
        console.log('image error - removing');
        if( this.props.imageB && this.state.src !== this.props.originUrl ) {
            this.setState({
                src: this.props.originUrl 
            })         

        } else {
            this.getDOMNode().remove();
        }
        // 参考详情  调用接口后端抓取图片
        // 父类触发更新
        //this.props.fetchListItemImage(this.props.src);
    },


    onLoad: function (e){
        //图片加载完成  查看是否error 
        console.log('onLoad');
    },
    componentDidMount: function () {
        if (this.props.forceUpdate) {
            // reload src to force onerror to be called if image link was not valid
            this.getDOMNode().src = this.props.src;
            this.forceUpdate();
        }
    },

    render: function () {
                //onLoad={ this.onLoad }
        return (
            <img 
                onError={this.onError} 
                className={this.props.classes} 
                src={this.state.src} 
            />
        );
    }
});
