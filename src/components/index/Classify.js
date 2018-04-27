import React,{ Component } from 'react'
import styles from './index.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Classify extends Component {
    constructor(props){
        super(props)
        this.state={
            listArr:[]
        }
    }
    componentDidMount() {
        let This = this;
        fetch('/api/mall/category', {
            method: 'GET' // 指定是POST/GET请求
        })
        .then((response)=>{
            response.json().then(function(data){      //将response进行json格式化
            
            let getData = data;   
            This.setState({
                listArr:getData
            })
            
            }); 
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    itemHandle(){
        //alert('hh')
    }
    render(){
        return(
            <ul className={styles.assortment}>
                {
                    this.state.listArr.map((item,index)=>{
                        return (
                            <li onClick={this.itemHandle} key={index}>
                                <Link to={{
                                    pathname:`/list/${item.category_id}`,
                                    state: item.category_id,
                                }}>
                                <div className={styles.pic}><img src={item.icon} alt=""/></div>
                                <p>{item.category_name}</p>
                                </Link>
                            </li>
                        )
                    })
                }
                
            </ul>
        )
    }
    

}
export default Classify