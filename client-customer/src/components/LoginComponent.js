import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/WithRouter';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: 'Hieu0912',
      txtPassword: '123'
    };
  }
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">ĐĂNG NHẬP</h2>
        <form>
          <table className="align-center1">
            <tbody>
              <tr>
                <td>Tài khoản</td>
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
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td><input type="submit" value="Đăng Nhập" onClick={(e) => this.btnLoginClick(e)} /></td>
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
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Vui lòng nhập tên người dùng và mật khẩu!');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Optional: smooth scrolling animation
    });
  };
}
export default withRouter(Login);