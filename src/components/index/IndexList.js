import React,{Component} from 'react'
import ListCommon from '../../common/list/List'
import styles from './index.css'

class IndexList extends Component {
    constructor(props){
        super(props)
        this.state={
            listArr:[],
            url:'/api/mall/itemlist'
        }
    }
    componentDidMount() {
        
        //this.getUrlData('/api/mall/itemlist')
        // let This = this;
        // fetch('/api/mall/itemlist', {
        //     method: 'GET' // 指定是POST/GET请求
        // })
        // .then((response)=>{
        //     response.json().then(function(data){      //将response进行json格式化
            
        //     let getData = data;   
        //     This.setState({
        //         listArr:getData.item_list
        //     })
            
        //     }); 
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })
    }
    
    render(){
        return (
            <div>
                <div className={styles.tjTitle}>推荐</div>
                <ListCommon url={this.state.url}/>
            </div>
        )
    }
}
export default IndexList