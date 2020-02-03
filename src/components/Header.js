import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './Header.css';
import { connect } from 'react-redux';

class Header extends Component {

    //constructor(props) {
    //    super(props) 
    //    this.state = { show: 'All' }
    //}

    render() {
        const styleHide = { display: 'none'}
        const styleShow = {}
        return (
            <div id="header" className="bb-header">
              <div id="logo">
                Book Barn
              </div>
              <Link id="menuLogout" to="/" >
                {this.props.isAuthenticated ? 'Logout' : 'Login'}
              </Link>
              <Link id="menuRegister" to="/register" style={this.props.isAuthenticated ? styleHide : styleShow} >
                Register
              </Link>
              <Link id="menuOverview" to="/books" style={this.props.isAuthenticated ? styleShow : styleHide} >
                Overview
              </Link>
              <Link id="menuAdd" to="/edit/0" style={this.props.isAuthenticated ? styleShow : styleHide} >
                Add Book
              </Link>
              <div id="cartCount" style={this.props.isAuthenticated ? styleShow : styleHide} >
                Cart: {this.props.cartCount}
              </div>
            </div>
        )
      }
}

const mapStateToProps = (state) => {
    return({ isAuthenticated: state.isAuthenticated,
             cartCount: state.cartCount })
}

export default connect(mapStateToProps)(Header);