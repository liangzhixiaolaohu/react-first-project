import React,{ Component } from 'react'
import './list.css'
import { Link,Redirect } from 'dva/router'
import { ListView } from 'antd-mobile';

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class ListCommon extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      listArr:[],
      page:1,
      newData:[],
      url:this.props.url
    };
  }
  componentWillMount(){
    
  }
  componentDidMount() {
    this.getUrlData(this.state.url)
    
    // simulate initial Ajax
    .then(()=>{
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([...this.state.listArr]),
        isLoading: false,
      });
    })
    //setTimeout(() => {
      
      
    //}, 600);
  }
  getUrlData(url){
      let This = this; 
      return fetch(url+'&page='+this.state.page, {
          method: 'GET' // 指定是POST/GET请求
      })
      .then((response)=>{
          response.json().then(function(data){      //将response进行json格式化
          
          let getData = data;
          //console.log(This.state.newData)
          let newData = [...This.state.newData,...getData.item_list]
          //console.log(This.state.newData)
          This.setState({
              listArr:newData
          })
          
          });
          
      })
      .catch((error)=>{
          console.log(error)
      })
      
  }
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.url !== this.state.url) {
      
        this.setState({
            url: nextProps.url,
            newData:[]
        });
        this.getUrlData(nextProps.url)
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    if( nextState.listArr !== this.state.listArr ){
      return false
    }
    return true
  }
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    //++this.state.page;
    let page = this.state.page + 1;
    this.getUrlData(this.state.url)
    console.log(this.state.page)
    this.setState({ isLoading: true, page, });
    setTimeout(() => {
      this.rData = { ...this.rData,  };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.listArr),
        isLoading: false,
      });
    }, 1000);
  }
  
  render() {
    console.log(this.state.listArr)
    const data = this.state.listArr;
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <li key={index}>
            <div className="pic">
                <Link to={
                    {
                        pathname: `/show/${obj.item_id}`
                    }
                }>
                    <img src={obj.image_url} alt=""/>
                </Link>
            </div>
            <div className="tit">{obj.title}</div>
            <div className="price">
              <div className="price-compare">
                  <div className="tmall">天猫价 ¥{obj.price}</div>
                  <div className="discount">券后¥ <span>{obj.final_price}元</span></div>
              </div>
              <div className="voucher">
                  <div className="amount">月销{obj.volume}</div>
                  <div className="coupons">{obj.coupon_info}</div>
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
