/** @jsx React.DOM */

'use strict';

var React = require('react');

var Option = require('./option');

var store = require('../../utils').store

function storeSelect (data) {
    return store('storeSelect', data )
}

module.exports = React.createClass({
    displayName: 'CategorySelecter',

    componentDidMount: function(){
        var defaultSel = storeSelect() 
        if( defaultSel )  {
            var elem =  this.refs.select.getDOMNode()
            elem.selectedIndex = defaultSel
        }
    },
    shouldComponentUpdate: function () {
        return false;
    },

    getOptionsToRender: function () {
        return this.props.categories.map(function (category) {
            return (
                <Option key={category.display} input={category} />
            );
        });
    },

    handleChange: function (event) {
        var selElem = event.target
        this.props.changeCategory( selElem.value);
        storeSelect( selElem.selectedIndex )
    },

    render: function () {
        return (
            <div className='container top15'>
                <form>
                    <div className='form-group'>
                        <select 
                            ref='select'
                            onChange={this.handleChange} 
                            className='form-control'
                        >
                            {this.getOptionsToRender()}
                        </select>
                    </div>
                </form>
            </div>
        );
    }
});
