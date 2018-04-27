import React, { Component } from 'react'
import ListCommon from '../../common/list/List'
import Banner from '../../common/banner/banner'
import Listview from '../../common/list/Listview'
import { stringify } from 'qs';
//console.log(stringify({page:1, banner_id:2}));

class BannerList extends Component {
    constructor(props){
        super(props)
        this.state={
            listArr: [],
            banner:{},
            data:{},
            banner_id:'',
            url:'/api/mall/activity'
        }
    }
    componentWillMount(){
        let url = window.location.href;
        let urlArr = url.split('/');
        this.setState({url:this.state.url+`?banner_id=`+urlArr[urlArr.length-1]})
    }
    componentDidMount(){
        
        let This = this;
        let url = window.location.href;
        let urlArr = url.split('/');
        fetch('/api/mall/activity?banner_id='+urlArr[urlArr.length-1], {
            method: 'GET', // 指定是POST/GET请求
          })
          .then((response)=>{
            response.json().then(function(data){      //将response进行json格式化
              
              let getData = data;    
              This.setState({
                //listArr : getData.item_list,
                banner : getData.banner
              })
              //console.log(This.state.listArr.length)
            }); 
          })
          .catch((error)=>{
            console.log(error)
        })
    }
    componentWillUpdate(){
        
    }
    
    render(){
        return (
            <section>
                <img src={this.state.banner.image}/>
                {/* 列表 */}
                <div className="wBlock">
                    <ListCommon url={this.state.url}/>
                    
                </div>
            </section>
        )
    }
}
export default BannerList