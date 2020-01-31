import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props) 
        this.state = { show: 'All' }
    }

    render() {
        return (
            <div id="header" className="bb-header">
              <div id="logo">
                Book Barn
              </div>
              <Link id="menuOverview" to="/books" >
                Overview
              </Link>
              <Link id="menuAdd" to="/edit/0" >
                Add
              </Link>
              <Link id="menuRegister" to="/register" >
                Register
              </Link>
              <Link id="menuLogout" to="/" >
                Logout
              </Link>
            </div>
        )
      }
}

export default Header;