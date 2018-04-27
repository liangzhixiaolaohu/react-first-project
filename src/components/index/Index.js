import React, { Component } from 'react'
import '../../assets/css/common.css'
import './index.css'
import ListCommon from '../../common/list/List'
import { BrowserRouter as Router, Link } from 'react-router-dom'


class Index extends React.Component {
    constructor() {
        super();
        
        this.state = {
            records: []
        };
    }
    componentDidMount() {
        axios.get('http://api.smteat.com/m/mall/category').then(
          res => {
              console.log(res)
            
          }
        ).catch(
          error => {
            this.setState({
              isLoaded: true,
              error
            })
          }
        )
      }
    render (){
        return (
            <section>
                <div className="wBlock">
                    {/* 搜索 */}
                    <div className="search">
                        <i className="searchIcon"></i><input type="text" placeholder="请输入你要找的"/>
                    </div>
                    {/* banner */}
                    
                    <div className="banner">
                        <Link to="/list"><img src={require('../../assets/images/g1.png')} alt=""/></Link>
                        
                    </div>
                    
                </div>
                {/* 分类 */}
                <div className="wBlock">
                    <ul className="assortment">
                        <li>
                            <div className="pic"><img src={require('../../assets/images/g3.png')} alt=""/></div>
                            <p>坚果</p>
                        </li>
                        <li>
                            <div className="pic"><img src={require('../../assets/images/bg.png')} alt=""/></div>
                            <p>坚果</p>
                        </li>
                        <li>
                            <div className="pic"><img src={require('../../assets/images/g2.png')} alt=""/></div>
                            <p>坚果坚果坚果坚果</p>
                        </li>
                        <li>
                            <div className="pic"><img src={require('../../assets/images/g1.png')} alt=""/></div>
                            <p>坚果坚果坚果坚果坚果</p>
                        </li>
                        <li>
                            <div className="pic"><img src={require('../../assets/images/more.png')} alt=""/></div>
                            <p>更多</p>
                        </li>
                    </ul>
                    
                </div>
                {/* 限时闪购 */}
                <div className="wBlock">
                    <div className="blockPad">
                        <div className="top">
                            <div className="title">限时<span>闪购</span><p>这里有特价</p></div>
                        </div>
                        <ul className="time-limit-list">
                            <li>
                                <div className="pic"><img src={require('../../assets/images/g1.png')} alt=""/></div>
                                <div className="text">
                                    <div className="tit">新品携带方便新品早餐奶和早餐饼干</div>
                                    <div className="price">
                                        <div className="price-compare">
                                            <div className="tmall">天猫价 ¥99</div>
                                            <div className="discount">券后¥ <span>79元</span></div>
                                        </div>
                                        <div className="voucher">
                                            <div className="amount">月销2301</div>
                                            <div className="coupons">40元券</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="pic"><img src={require('../../assets/images/g1.png')} alt=""/></div>
                                <div className="text">
                                    <div className="tit">新品携带方便新品早餐奶和早餐饼干</div>
                                    <div className="price">
                                        <div className="price-compare">
                                            <div className="tmall">天猫价 ¥99</div>
                                            <div className="discount">券后¥ <span>79元</span></div>
                                        </div>
                                        <div className="voucher">
                                            <div className="amount">月销2301</div>
                                            <div className="coupons">40元券</div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* 热门 */}
                <div className="wBlock">
                    <div className="hot">
                        <div className="title"><img src={require('../../assets/images/hot.png')} alt=""/></div>
                        <ul className="hot-list">
                            <li>
                                <div className="pic"><img src={require('../../assets/images/g1.png')} alt=""/></div>
                                <p>玩具美食一袋</p>
                                <div className="price"><span>¥18.9</span><em>¥28.9</em></div>
                            </li>
                            <li>
                                <div className="pic"><img src={require('../../assets/images/g1.png')} alt=""/></div>
                                <p>玩具美食一袋</p>
                                <div className="price"><span>¥18.9</span><em>¥28.9</em></div>
                            </li>
                            <li>
                                <div className="pic"><img src={require('../../assets/images/g1.png')} alt=""/></div>
                                <p>玩具美食一袋</p>
                                <div className="price"><span>¥18.9</span><em>¥28.9</em></div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 列表 */}
                <div className="wBlock">
                    <div className="choice">
                        <div className="active">推荐</div>
                        <div>销量</div>
                        <div>最新</div>
                        <div className="active">
                            价格<span><i className="up"></i><i className="down"></i></span>
                        </div>
                    </div>
                    {/* <ListCommon/> */}
                </div>
            </section>
        )
    }
}

export default Index