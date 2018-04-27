import react,{Component} from 'react'
import styles from './index.css'


class TimeLimit extends Component {
    constructor(props){
        super(props)
        const {d,h,m,s} = props;
        this.state={
            listArr:[],
            countDown:[],
            d:[],
            h:[],
            m:[],
            s:[]
            
        }
    }
    componentDidMount() {
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
        fetch('/api/mall/snapup', {
            method: 'GET' // 指定是POST/GET请求
        })
        .then((response)=>{
            response.json().then(function(data){      //将response进行json格式化
                let getData = data;   
                This.setState({
                    listArr:getData.item_list
                })
                This.state.listArr.map((item,index)=>{
                    This.state.countDown.push(item.end_time)
                })
                This.setState({countDown:This.state.countDown})
                
                let timer = null;
                let d=[],h=[],m=[],s=[]
                clearInterval(timer)
                timer=setInterval(()=>{
                    const newArr = []
                    This.state.countDown.map((item,index)=>{
                        newArr.push(new Date(item).getTime() - new Date().getTime())
                    })
                    for( let i=0; i<newArr.length; i++ ){
                        if( newArr[i]<=0 ){
                            clearInterval(timer)
                        }
                    }
                    
                    for( let i=0; i<newArr.length; i++ ){
                        d[i] = parseInt(newArr[i]/(1000*60*60*24))
                        h[i] = parseInt(newArr[i]/(1000*60*60)-d[i]*24)
                        m[i] = parseInt(newArr[i]/(1000*60)-(d[i]*24*60)-(h[i]*60))
                        s[i] = parseInt(newArr[i]/(1000)-(d[i]*24*60*60)-(h[i]*60*60)-(m[i]*60))

                        if ( d[i] < 10 ) d[i] = '0'+d[i]
                        if ( h[i] < 10 ) h[i] = '0'+h[i]
                        if ( m[i] < 10 ) m[i] = '0'+m[i]
                        if ( s[i] < 10 ) s[i] = '0'+s[i]
                        
                    }
                    
                    This.setState({d,h,m,s})
                },1000)
            }); 
        })
        .catch((error)=>{
            console.log(error)
        })
        //this.countDownFn()
        
        //this.setState({h:'11'})
        
    }
    componentWillUpdate(){
        // this.state.listArr.map((item,index)=>{
        //     this.state.countDown.push(item.end_time)
        // })
    
    }
    countDownFn(){
        let This = this;
        let now = new Date()
        let year = now.getFullYear(); //年份
        let month = now.getMonth()+1;  //月
        let date = now.getDate();  //日
        let hour = now.getHours();  //时
        let minu = now.getMinutes();  //分
        let sec = now.getSeconds();  //秒
        
        
    }
    render(){
        const {d,h,m,s} = this.state;
        return (
            <div className={styles.blockPad}>
                <div className={styles.top}>
                    <div className={styles.title}>限时<span>闪购</span><p>这里有特价</p></div>
                </div>
                <ul className={styles.timeLimitList}>
                    {
                        this.state.listArr.map(function(item,index){
                            return (
                                <li key={index}>
                                    <div className={styles.pic}><a href={item.click_url} data-type="bc_applink" data-appkey="24824077" data-params='{"pid":"mm_130910445_43416645_374834792"}'><img src={item.image_url} alt=""/></a></div>
                                    <div className={styles.text}>
                                        <div className={styles.tit}>{item.title}</div>
                                        <div className={styles.price}>
                                            <div className={styles.priceCompare}>
                                                <div className={styles.tmall}>天猫价 ¥{item.price}</div>
                                                <div className={styles.discount}>券后¥ <span>{item.final_price}元</span></div>
                                            </div>
                                            <div className={styles.voucher}>
                                                <div className={styles.amount}>仅剩{item.total_amount - item.sold_num}</div>
                                                <div className={styles.countDown}><span>{d[index]}</span><em>天</em><span>{h[index]}</span><em>:</em><span>{m[index]}</span><em>:</em><span>{s[index]}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default TimeLimit