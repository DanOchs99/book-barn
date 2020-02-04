import React from 'react';
import {Link} from 'react-router-dom'; 
import './Header.css';
import { connect } from 'react-redux';

const Header = (props) => {

    const styleHide = { display: 'none'}
    const styleShow = {}
        
    return (
            <div id="header" className="bb-header">
              <div id="logo">
                Book Barn
              </div>
              <Link id="menuLogout" to="/" >
                {props.isAuthenticated ? 'Logout' : 'Login'}
              </Link>
              <Link id="menuRegister" to="/register" style={props.isAuthenticated ? styleHide : styleShow} >
                Register
              </Link>
              <Link id="menuOverview" to="/books" style={props.isAuthenticated ? styleShow : styleHide} >
                Overview
              </Link>
              <Link id="menuAdd" to="/edit/0" style={props.isAuthenticated ? styleShow : styleHide} >
                Add Book
              </Link>
              <div id="cartCount" style={props.isAuthenticated ? styleShow : styleHide} >
                Cart: {props.cartCount}
              </div>
            </div>
           );
}

const mapStateToProps = (state) => {
    return({ isAuthenticated: state.userR.isAuthenticated,
             cartCount: state.cartR.cartCount })
}

export default connect(mapStateToProps)(Header);