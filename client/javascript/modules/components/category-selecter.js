/** @jsx React.DOM */

'use strict';

var React = require('react');

var Option = require('./option');

var storeSelect = require('../../utils').storeSelect


module.exports = React.createClass({
    displayName: 'CategorySelecter',
    afterDidMount: false,
    shouldComponentUpdate: function () {
        return false;
    },

    componentDidMount: function(){
        var defaultSel = storeSelect() 
        if( defaultSel )  {
            var elem =  this.refs.select.getDOMNode()
            elem.selectedIndex = defaultSel.index
        }
        this.afterDidMount = true;
        //this.setState({ afterDidMount: true});
    },

    getOptionsToRender: function () {
        return this.props.categories.map(function (category) {
            return (
                <Option key={category.display} input={category} />
            );
        });
    },

    handleChange: function (event) {
        if( ! this.afterDidMount ) {
            return  
        }
        var selElem = event.target
        this.props.changeCategory( selElem.value);
        // 存储后  会增加无限滚动的bug出现的几率
        // 退出执行
        setTimeout(function(){
            storeSelect({ 
                index:  selElem.selectedIndex ,
                value: selElem.value
            });
        }, 500)

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

