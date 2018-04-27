import React,{ Component } from 'react'
import './list.css'
// import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Link,Redirect } from 'dva/router'
import { ListView } from 'antd-mobile';

function MyBody(props) {
    return (
        <div className="choice-list">
        <span style={{ display: 'none' }}>you can custom body wrap element</span>
        {props.children}
        </div>
    );
}
const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: 'Meet hotel',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: 'McDonald\'s invites you',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: 'Eat the week',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
 
  const NUM_SECTIONS = 5;
  const NUM_ROWS_PER_SECTION = 5;
  let pageIndex = 0;
  
  const dataBlobs = {};
  let sectionIDs = [];
  let rowIDs = [];
  function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
      const ii = (pIndex * NUM_SECTIONS) + i;
      const sectionName = `Section ${ii}`;
      sectionIDs.push(sectionName);
      dataBlobs[sectionName] = sectionName;
      rowIDs[ii] = [];
  
      for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
        const rowName = `S${ii}, R${jj}`;
        rowIDs[ii].push(rowName);
        dataBlobs[rowName] = rowName;
      }
    }
    sectionIDs = [...sectionIDs];
    rowIDs = [...rowIDs];
  }

class ListCommon extends Component {
    constructor(props) {
    super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
         
        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }
    
    componentDidMount(){
        setTimeout(() => {
            genData();
            this.setState({
              dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
              isLoading: false,
              //height: hei,
            });
          }, 600);
          
    }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          genData(++pageIndex);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
            isLoading: false,
          });
        }, 1000);
      }
    render(){
        // return (
        //     <ul className="choice-list">
        //         {
                    
        //             this.props.listArr.map(function(item,index){
        //                 return (
        //                     <li key={index} id={item.item_id}>
        //                         <div className="pic">
        //                             <Link to={
        //                                 {
        //                                     pathname: `/show/${item.item_id}`
        //                                 }
        //                             }>
        //                                 <img src={item.image_url} alt=""/>
        //                             </Link>
        //                         </div>
        //                         <div className="tit">{item.title}</div>
        //                         <div className="price">
        //                             <div className="price-compare">
        //                                 <div className="tmall">天猫价 ¥{item.price}</div>
        //                                 <div className="discount">券后¥ <span>{item.final_price}元</span></div>
        //                             </div>
        //                             <div className="voucher">
        //                                 <div className="amount">月销{item.volume}</div>
        //                                 <div className="coupons">{item.coupon_info}</div>
        //                             </div>
        //                         </div>
        //                     </li>
        //                 )
        //             })
                    
        //         }
                
        //     </ul>
        // )
    
    const dd = this.props.listArr;
    console.log(dd)
    let index = dd.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index > 0) {
      
      const obj = dd[index--];
      console.log(obj)
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
      }
    };
    return (
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => <span>header</span>}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderBodyComponent={() => <MyBody />}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={4}
          onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={50}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      );


    }
}
export default ListCommon;
