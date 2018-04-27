import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import '../../common/banner/banner.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'

class IndexBanner extends React.Component {
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
    let This = this;
        
    fetch('/api/mall/banner', {
        method: 'GET', // 指定是POST/GET请求
      })
      .then((response)=>{
        response.json().then(function(data){      //将response进行json格式化
          //console.log(This.setState)
          let getData = data;    
          This.setState({
            listArr : getData
          })
          
        }); 
      })
      .catch((error)=>{
        console.log(error)
    })
  }
  render() {
    return (
        <div className="banner">
      <WingBlank>
        
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          //beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
        >
          {this.state.listArr.map((val, index) => (
            <Link
              key={val}
              to={
                {
                    pathname: `/${val.banner_id}`,
                    state: val.banner_id,
                }
              }
              style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
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
            </Link>
          ))}
        </Carousel>

        <WhiteSpace />
        

      </WingBlank>
      </div>
    );
  }
}
export default IndexBanner

