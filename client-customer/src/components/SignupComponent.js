import axios from 'axios';
import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'Hieu0912',
      txtPassword: '123',
      txtName: 'HieuDo',
      txtPhone: '0354688354',
      txtEmail: 'doconghieu0912@gmail.com'
    };
  }
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">ĐĂNG KÝ</h2>
        <form>
          <table className="align-center1">
            <tbody>
              <tr>
                <td>Tên tài khoản</td>
                <td><input type="text" 
                value={this.state.txtUsername} 
                onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} 
                placeholder='Username*'
                /></td>
              </tr>
              <tr>
                <td>Mật khẩu</td>
                <td><input type="password" 
                value={this.state.txtPassword} 
                onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
                placeholder='Password*'
                /></td>
              </tr>
              <tr>
                <td>Tên</td>
                <td><input type="text" 
                value={this.state.txtName} 
                onChange={(e) => { this.setState({ txtName: e.target.value }) }} 
                placeholder='Name*'
                /></td>
              </tr>
              <tr>
                <td>Số điện thoại</td>
                <td><input type="tel" 
                value={this.state.txtPhone} 
                onChange={(e) => { this.setState({ txtPhone: e.target.value }) }}
                placeholder='Phone*'
                 /></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><input type="email" 
                value={this.state.txtEmail} 
                onChange={(e) => { this.setState({ txtEmail: e.target.value }) }}
                placeholder='Email*'
                 /></td>
              </tr>
              <tr>
                <td></td>
                <td><input type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)} /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.scrollToTop()
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Vui lòng nhập tên người dùng và mật khẩu, tên, số điện thoại và email!');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: smooth scrolling animation
    });
  };
}
export default Signup;