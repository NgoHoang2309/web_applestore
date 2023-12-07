import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            </Link>
            <figcaption className="text-center">
              {item.name}<br />
              Giá tiền: {parseInt(item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </figcaption>
          </figure>
        </div>
      );      
    });
    
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            </Link>
            <figcaption className="text-center">
              {item.name}<br />
              Giá tiền: {parseInt(item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              {/* Giá tiền: {parseInt(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} */}
            </figcaption>
          </figure>
        </div>
      );      
    });
    const settings = {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, // Tự động chuyển đổi giữa các slide
      autoplaySpeed: 3000, // Tốc độ chuyển đổi giữa các slide (thời gian tính bằng milliseconds)
    };    
    return (
      <div>
        {/* <div className='anh-mot'>
          <img src='banner1.webp'></img>
        </div> */}
        <div className='anh-banner'>
        <Slider {...settings}>
          {/* Slide sản phẩm mới */}
          <img src='banner1.webp'></img>
          <img src='banner2.webp'></img>
          <img src='banner3.webp'></img>
          <img src='banner12.webp'></img>
          <img src='banner1.webp'></img>
          <img src='banner3.webp'></img>
          <img src='banner12.webp'></img>
        </Slider>
        </div>
        <div className="align-center">
          <h2 className="text-center">SẢN PHẨM MỚI</h2>
          {newprods}
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 className="text-center">SẢN PHẨM NỔI BẬT</h2>
            {hotprods}
          </div>
          : <div />}
        <div className='google-map'>
          <iframe title="gmap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7878741515547!2d106.69744577559833!3d10.827539189324364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528f4a62fce9b%3A0xc99902aa1e26ef02!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBWxINuIExhbmc!5e0!3m2!1svi!2s!4v1700722208655!5m2!1svi!2s" 
          width="700" height="300" style={{ border: 0 }} 
          loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        {/* <div className='anh-hai'>
          <img src='banner12.webp'></img>
        </div>
        <div className='banner3'>
          <img src="banner3.jpg"></img>
        </div> */}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    this.scrollToTop()
  
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: smooth scrolling animation
    });
  };

}
export default Home;