import React, { Component } from 'react'
import styles from './details.css'
import ListCommon from '../../common/list/List'
import Banner from '../../common/banner/banner'

class Details extends Component {
    constructor(props){
        super(props)
        this.state={
            listArr: [],
            detailsData:{},
            bannerList:[],
            url:'/api/mall/itemrecommendlist'
        }
    }
    componentDidMount(){
        window.BC_SDK = BCSDK_AppLink.init({
            appkey : '24824077', //必填，输入百川应用的appkey
            backURL: 'smteat://', //必填，默认为空字符串，applink的tips的回跳url， 设置能在手机淘宝里面调回你自己应用的url，格式为`tbopen${appkey}`。
            openApp: true, //非必填，默认为true，非必填，是否唤起客户端，设置false，只会做H5跳转。
            linkKey: 'TM', //非必填，默认为TB, 唤起手淘(TB)/天猫(TM)。
            isNeedDownload: false, //非必填，默认为false, 没有app的情况下跳转目标h5页面还是下载页, 默认跳转目标h5页面。
            isDefaultRedirect: true, //选填, 没有唤起app的情况下是否默认跳转, 默认true。
            params:{pid:'mm_130910445_43416645_374834792'}, //非必填，带给applink协议的扩展参数,用户自定义参数也传在这里, 如scm、pvid、pid、subpid、e、unionId等业务参数会放到这里。
            trackParams:{}, //非必填，ybhpss的映射对象，传入这里的参数会被拼为ybhpss字符串带到协议上。   
            timeout: 1000 // 非必填，默认跳转(目标h5页/下载页)的延时时长。
          });
          //console.log(window.BC_SDK)
        let This = this;
        let url = window.location.href;
        let urlArr = url.split('/');
        this.setState({url:this.state.url+'?item_id='+urlArr[urlArr.length-1]})
        // 详情信息
        this.getDetails(urlArr[urlArr.length-1])
        
        // 列表
        // fetch('/api/mall/itemrecommendlist?item_id='+this.state.detailsData.item_id, {
        //     method: 'GET', // 指定是POST/GET请求
        //   })
        //   .then((response)=>{
        //     response.json().then(function(data){      //将response进行json格式化
        //       //console.log(This.setState)
        //       let getData = data;    
        //       This.setState({
        //         listArr : getData.item_list
        //       })
              
        //     }); 
        //   })
        //   .catch((error)=>{
        //     console.log(error)
        // })
        
    }
    getDetails(id){
        let This = this;
        fetch('/api/mall/item?item_id='+id, {
            method: 'GET', // 指定是POST/GET请求
          })
          .then((response)=>{
            response.json().then(function(data){      //将response进行json格式化
              //console.log(This.setState)
              let getData = data;    
              This.setState({
                detailsData : getData
              })
              
            }); 
          })
          .catch((error)=>{
            console.log(error)
        })
    }
    componentWillReceiveProps(nextProps) {
        if( this.state.detailsData.item_id !== nextProps.match.params.id ){
            this.getDetails(nextProps.match.params.id)
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
        // if( this.props.params.type !== nextProps.params.type ){
        //     this.setState({
        //         detailsData: this.props.location.state
        //     },()=>{
        //         this.getListData(nextProps.params.type)
        //     })
        // }
        
    }
    render(){
        return (
            <section>
                <div className={styles.banner}>
                    <img src={this.state.detailsData.image_url} alt=""/>
                </div>
                <div className='wBlock'>
                    <div className='blockPad'>
                        <div className='introduce'><span>{this.state.detailsData.shop_type == 1 ? '天猫' : '淘宝'}</span>{this.state.detailsData.title}</div>
                        <div className="price">
                            <div className="price-compare">
                                <div className="tmall">{this.state.detailsData.shop_type == 1 ? '天猫' : '淘宝'}价 ¥{this.state.detailsData.price}</div>
                                <div className="discount">券后¥ <span>{this.state.detailsData.final_price}元</span></div>
                            </div>
                            <div className="voucher">
                                <div className="amount"><span>包邮</span>月销{this.state.detailsData.volume}</div>
                            </div>
                        </div>
                        <div className="receive">
                            <div className="receive-l">
                                <span>{this.state.detailsData.coupon_info}</span><em>期限:{this.state.detailsData.coupon_start_time}-{this.state.detailsData.coupon_end_time}</em>
                            </div>
                            <div className="receive-r"><span><a href={this.state.detailsData.coupon_click_url} data-type="bc_applink"  data-params='{"pid":"mm_130910445_43416645_374834792"}'>立即领券</a></span></div>
                        </div>
                    </div>
                </div>
                {/* 店铺 */}
                <div className="wBlock">
                    <div className="shop">
                        <div className="shop-name">
                            <div className="name">
                                <div className="tit">{this.state.detailsData.shop_title}</div>
                                <div className="from">{this.state.detailsData.shop_type == 1 ? '天猫' : '淘宝'}</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {/* 宝贝详情 */}
                <div className="wBlock">
                    <div className={styles.title}>宝贝详情</div>
                    <img src={this.state.detailsData.image_list}/>
                    
                </div>
                {/* 推荐 */}
                <div className="wBlock">
                    <div className={styles.title}>推荐</div>
                    <ListCommon url={this.state.url}/>
                </div>
                {/* 占位 */}
                <div style={{height:'2rem'}}></div>
                {/* 底部栏 */}
                <div className="bottom-bar">
                    <div className="l-blank"><p>¥<span>{this.state.detailsData.final_price}</span></p><em><a href={this.state.detailsData.coupon_click_url} data-type="bc_applink" data-params='{"pid":"mm_130910445_43416645_374834792"}'>领券购买</a></em></div>
                </div>
            </section>
        )
    }
}
export default Details