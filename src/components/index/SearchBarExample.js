import React, { Component } from 'react'
import styles from './index.css'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';

class SearchBarExample extends Component {
    state = {
    value: '美食',
    };
    componentDidMount() {
    
    }
    onChange= (value) => {
    this.setState({ value });
    };
    clear = () => {
    this.setState({ value: '' });
    };
    handleClick = () => {
    this.manualFocusInst.focus();
    }
    render() {
    return (<div>
        <SearchBar
        placeholder={this.state.value}
        ref={ref => this.manualFocusInst = ref}
        />
    </div>);
    }
}
export default SearchBarExample