import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';


class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
          <li className="menu"><Link to='/admin/home'>Home</Link></li>
          <li className="menu"><Link to='/admin/category'>DANH MỤC</Link></li>
          <li className="menu"><Link to='/admin/product'>SẢN PHẨM</Link></li>
          <li className="menu"><Link to='/admin/order'>ĐƠN HÀNG</Link></li>
          <li className="menu"><Link to='/admin/customer'>TÀI KHOẢN NGƯỜI DÙNG</Link></li>
          </ul>
        </div>
        <div className="float-right">
          Xin chào <b>{this.context.username}</b> | <Link to='/admin/home' className="logout" onClick={this.lnkLogoutClick.bind(this)}>Đăng xuất</Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;