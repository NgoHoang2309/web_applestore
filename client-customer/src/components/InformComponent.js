import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
        {this.context.token === '' ?
          <div id='account'><Link to='/login'><img src='login.png' alt="Logo" />Login</Link>  <Link to='/signup'><img src='sign-up.png' alt="Logo" />Sign-up</Link>  <Link to='/active'><img src='active.png' alt="Logo" />Active</Link></div>
          :
          <div id='inaccount'><img src='account.png' alt="Logo" /><b>{this.context.customer.name}</b><div id='logout'><Link to='/home' onClick={() => this.lnkLogoutClick()}> <img src='logout.png' alt="Logo" />Logout</Link> <Link to='/myprofile'><img src='user.png' alt='logo'/>My profile</Link> <Link to='/myorders'><img src='order.png' alt="Logo" />My orders</Link></div></div>
        }
        </div>
        <div className="float-right">
        <div id='mycart'><Link to='/mycart'><img src='mycart.png' alt="Logo" /></Link><b>{this.context.mycart.length}</b></div>
        
        </div>
        <div className="float-clear" />
        
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;