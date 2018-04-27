/* eslint-disable */
import React, { Component } from 'react'
import './list.css'
import { Link } from 'dva/router'
import { ListView } from 'antd-mobile';

class ListCommon extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.page = 1;
    this.url = props.url;
    this.state = {
      dataSource,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.getUrlData()
  }
  getUrlData() {
    this.setState({
      isLoading: true,
    })
    return fetch(`${this.url}&page=${this.page}`)
      .then((response) => {
        response.json().then(data => { 
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(data.item_list),
          })
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.url) {
      this.url = nextProps.url;
      this.getUrlData()
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.dataSource == this.state.dataSource) {
      return false
    }
    return true
  }
  onEndReached = (event) => {
    if (this.state.isLoading) return;
    this.page = ++this.page;
    this.getUrlData();
  }
  render() {
    const row = (rowData, sectionID, rowID) => {
      const { item_id, image_url, title, price, final_price, volume, coupon_info } = rowData;
      return (
        <li key={item_id}>
          <div className="pic">
            <Link to={
              {
                pathname: `/show/${item_id}`
              }
            }>
              <img src={image_url} alt="" />
            </Link>
          </div>
          <div className="tit">{title}</div>
          <div className="price">
            <div className="price-compare">
              <div className="tmall">天猫价 ¥{price}</div>
              <div className="discount">券后¥ <span>{final_price}元</span></div>
            </div>
            <div className="voucher">
              <div className="amount">月销{volume}</div>
              <div className="coupons">{coupon_info}</div>
            </div>
          </div>
        </li>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        className="choice-list"
        pageSize={20}
        useBodyScroll
        onEndReached={this.onEndReached}
      />
    );
  }
}
export default ListCommon;
