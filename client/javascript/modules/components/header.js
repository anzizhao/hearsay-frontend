/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactAsync = require('react-async');

module.exports = React.createClass({
    displayName: 'Header',

    getInitialState: function () {
        return null;
    },

    shouldComponentUpdate: function(np, ns) {
        if( np.hideImage !== this.props.hideImage ) {
            return true 
        }
        return false;
    },

    render: function() {
        return (
            <nav className='navbar navbar-default navbar-static-top' role='navigation'>
                <div className='container'>

                    <div className='navbar-header'>
                        <a className='navbar-brand' href='/'>
                            <img className="navbar-logo" src='/logo.png' height='40'/>
                            <span className="navbar-logo-text">{this.props.title ? this.props.title : 'Hearsay'}</span>
                        </a>
                    </div>

                    <div className="dropdown  setting">
                        <span 
                            className="caret"
                            id="settingDropdownMenu" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="true"
                        >
                        </span>
                        <ul className="dropdown-menu" aria-labelledby="settingDropdownMenu">
                            <li onClick={this.props.clearReadInfo } >清除已读</li>
                            <li onClick={this.props.toggleHideImage} >
                                {
                                    this.props.hideImage ?  '显示图片' : '隐藏图片'  
                                }
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        );
    }
});

                        //<button className="btn btn-default dropdown-toggle" type="button" 
                            //id="settingDropdownMenu" 
                            //data-toggle="dropdown" 
                            //aria-haspopup="true" 
                            //aria-expanded="true"
                        //>
                        //</button>
