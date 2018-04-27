import React, { Component } from 'react'
import styles from './index.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class Hot extends Component {
    constructor(props){
        super(props)
        this.state = {
            listArr : []
        }
    }
    componentDidMount(){
        let This = this;
        fetch('/api/mall/hot',{
            method:'GET'
        })
        .then((response)=>{
            response.json().then(function(data){
                let getData = data;
                This.setState({
                    listArr:getData.item_list
                })
                
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
    render(){
        return (
            <div className={styles.hot}>
                <div className={styles.title}><img src={require('../../assets/images/hot.png')} alt=""/></div>
                <ul className={styles.hotList}>
                    
                    {
                        this.state.listArr.map((item,index)=>{
                            return (
                                <li key={index}>
                                    <div className={styles.pic}><Link to={{pathname: `/show/${item.item_id}`, state: item,}}><img src={item.image_url} alt=""/></Link></div>
                                    <p>{item.title}</p>
                                    <div className={styles.price}><span>¥{item.final_price}</span><em>¥{item.price}</em></div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default Hot