import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  calculateTotal = () => {
    if (this.state.order && this.state.order.items) {
      let total = this.state.order.items.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
      return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    return ''; // Trả về rỗng nếu không có đơn hàng hoặc sản phẩm
  };
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ?
              <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>CHẤP NHẬN</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>HUỶ</span></div>
              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            <td>{item.quantity}</td>
            <td>{(item.product.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
            
          </tr>
        );
      });
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">DANH SÁCH ĐƠN HÀNG</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>NGÀY TẠO</th>
                <th>KHÁCH HÀNG</th>
                <th>SỐ ĐIỆN THOẠI KHÁCH HÀNG</th>
                <th>TỔNG CỘNG</th>
                <th>TÌNH TRẠNG</th>
                <th>HOẠT ĐỘNG</th>
              </tr>
              {orders}
            </tbody>
          </table>
        </div>
        {this.state.order ?
          <div className="align-center">
            <h2 className="text-center">CHI TIẾT ĐƠN HÀNG</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>NO.</th>
                  <th>ID</th>
                  <th>TÊN SẢN PHẨM</th>
                  <th>HÌNH ẢNH</th>
                  <th>SỐ TIỀN</th>
                  <th>SỐ LƯỢNG</th>
                  <th>TỔNG TIỀN</th>
                </tr>
                {items}
              </tbody>
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'CHẤP THUẬN');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'ĐÃ HỦY');
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('KHÔNG THÀNH CÔNG!');
      }
    });
  }
  componentDidMount() {
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Order;