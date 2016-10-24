/** @jsx React.DOM */

'use strict';

var React = require('react');
var ReactAsync = require('react-async');

module.exports = React.createClass({
    displayName: 'Header',

    getInitialState: function () {
        return null;
    },

    shouldComponentUpdate: function() {
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

                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" id="settingDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="settingDropdownMenu">
                            <li>清除已读记录</li>
                            <li>不获取图片</li>
                        </ul>
                    </div>

                </div>
            </nav>
        );
    }
});
