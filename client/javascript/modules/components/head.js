/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'Head',

    componentWillReceiveProps: function(nextProps) {
        document.title = nextProps.title;
    },

    shouldComponentUpdate: function() {
        return false;
    },

    render: function() {
        var title = this.props.title;
        var description = this.props.description;

        return (
            <head>
                <title>{title}</title>

                <meta name='description' content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta property='og:title' content={title} />
                <meta property='og:description' content={description} />
                <meta property='og:type' content='website' />
                <meta property='og:image' content='/favicon-196x196.png' />

                <link rel="icon"  href="/favicon.ico" />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
                <meta name="mobile-web-app-capable" content="yes" />

                <link href='/othercss/merriweather.css' rel='stylesheet' type='text/css' />
                <link href='/othercss/lato.css' rel='stylesheet' type='text/css' />
                <link rel='stylesheet' href='/othercss/bootstrap.min.css' />
                <link rel='stylesheet' href='/othercss/font-awesome.min.css' />

                <link rel='stylesheet' href='/stylesheets/theme.css' />
                <link rel='stylesheet' href='/stylesheets/app.css' />
                
            </head>
        );
    }
});
