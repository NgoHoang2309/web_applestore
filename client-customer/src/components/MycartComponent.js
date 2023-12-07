import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/WithRouter';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td>{item.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
          <td>{item.quantity}</td>
          <td>{(item.product.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
          <td><span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>XOÁ SẢN PHẨM</span></td>
        </tr>
      );
    });
    return (
      <div className="align-center">
        <h2 className="text-center">DANH SÁCH GIỎ HÀNG</h2>
        <table className="datatable" border="1">
          <tbody>
            <tr className="datatable">
              <th>No.</th>
              <th>ID</th>
              <th>TÊN HÀNG</th>
              <th>LOẠI</th>
              <th>HÌNH ẢNH</th>
              <th>GIÁ TIỀN</th>
              <th>SỐ LƯỢNG</th>
              <th>TỔNG TIỀN</th>
              <th>HOẠT ĐỘNG</th>
            </tr>
            {mycart}
            <tr>
              <td colSpan="6"></td>
              <td><strong>TỔNG CỘNG</strong></td>
              <td>{CartUtil.getTotal(this.context.mycart).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td><span className="link" onClick={() => this.lnkCheckoutClick()}>ĐẶT HÀNG</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  lnkCheckoutClick() {
    if (window.confirm('Bạn chắc chắn muốn đặt hàng!')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Giỏ hàng bị trống!');
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Đặt hàng thành công!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Đặt hàng không thành công!');
      }
    });
  }
}
export default withRouter(Mycart);