import React, { Component } from 'react'
import ListCommon from '../../common/list/List'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class List extends Component {
    constructor(props){
        super(props)
        this.state={
            categoryArr: [],
            listArr:[],
            categoryData:'',
            cid:'',
            url:'/api/mall/itemlist'
        }
        this.itemHandle = this.itemHandle.bind(this);
    }
    componentWillMount(){
        let url = window.location.href;
        let urlArr = url.split('/');
        this.setState({url:this.state.url+`?category_id=`+urlArr[urlArr.length-1]})
        
    }
    componentDidMount(){
        let This = this;
        this.setState({ 
            categoryData: this.props.location.state,
            cid:this.props.location.state
        })

        
        setTimeout(function(){
        // 分类
        fetch('/api/mall/category?pid='+This.state.categoryData, {
            method: 'GET', // 指定是POST/GET请求
          })
          .then((response)=>{
            response.json().then(function(data){      //将response进行json格式化
              //console.log(This.setState)
              let getData = data;    
              This.setState({
                categoryArr : getData
                })
                
            }); 
          })
          .catch((error)=>{
            console.log(error)
        })
        // 列表
        // fetch('/api/mall/itemlist?category_id='+This.state.cid, {
        //     method: 'GET', // 指定是POST/GET请求
        // })
        // .then((response)=>{
        //     response.json().then(function(data){      //将response进行json格式化
        //     let getData = data;    
        //     This.setState({
        //         listArr : getData.item_list
        //     })
            
        //     }); 
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })
        
        },20)
    }
    itemHandle(e){
        var tarEle = e.target;
        if( tarEle.tagName !== 'SPAN' ){
            tarEle = e.target.parentNode.parentNode;
        }
        var v = tarEle.getAttribute('data-cid')
        setTimeout(()=>{
            //this.setState({url:'/api/mall/itemlist'})
            this.setState({url:'/api/mall/itemlist'+'?category_id='+v})
            this.clearSpanClass()
            tarEle.style.color = '#FF8800';
            
        },20)
        
        // let This = this;
        // setTimeout(()=>{
        // // 列表
        // fetch('/api/mall/itemlist?category_id='+this.state.cid, {
        //     method: 'GET', // 指定是POST/GET请求
        // })
        // .then((response)=>{
        //     response.json().then(function(data){      //将response进行json格式化
        //     let getData = data;    
        //     This.setState({
        //         listArr : getData.item_list
        //     })
            
        //     }); 
        // })
        // .catch((error)=>{
        //     console.log(error)
        // })
        // },10)


    }
    clearSpanClass(e){
        let aSpan = document.querySelectorAll('.top-menu-list span')
        for( let i=0; i<aSpan.length; i++ ){
            aSpan[i].style.color = '#000'
        }
    }
    
    render(){
        return (
            <section>
                <div className="wBlock">
                    <div className="top-menu-list">
                        {
                            this.state.categoryArr.map((item,index)=>{
                                return (
                                    <span onClick={this.itemHandle.bind(this)} data-cid={item.category_id} key={index}>{item.category_name}</span>
                                )
                            })
                        }
                        
                    </div>
                </div>
                {/* 列表 */}
                <div className="wBlock">
                    
                    <ListCommon url={this.state.url}/>
                </div>
            </section>
        )
    }
}
export default List