import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import './banner.css'

class Banner extends React.Component {
  state = {
    data: ['1', '2', '3'],
    imgHeight: 176,
    slideIndex: 0,
    listArr: []
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
    // let This = this;
        
    //     fetch('/api/mall/banner', {
    //         method: 'GET', // 指定是POST/GET请求
    //       })
    //       .then((response)=>{
    //         response.json().then(function(data){      //将response进行json格式化
    //           //console.log(This.setState)
    //           let getData = data;    
    //           This.setState({
    //             listArr : getData
    //           })
              
    //         }); 
    //       })
    //       .catch((error)=>{
    //         console.log(error)
    //     })
  }
  render() {
    return (
        <div className="banner">
      <WingBlank>
        
      <Carousel
          autoplay={false}
          infinite
          selectedIndex={1}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.props.bannerList.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.image}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>

        <WhiteSpace />
        

      </WingBlank>
      </div>
    );
  }
}
export default Banner

