import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        let countries = []
        countries.push(<option>All</option>)
        countries.push(<option>United States</option>)
        countries.push(<option>France</option>)

        return (
            <div id="header" className="bb-header">
              <div id="logo">
                Book Barn
              </div>
              <select id="country">
                {countries}
              </select>
            </div>
        )
      }
}

export default Header;