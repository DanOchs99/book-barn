import React, {Component} from 'react';
import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            show: 'All'
        }
    }

    handleDropdownSelect = (e) => {
      this.setState({
          show: e.target.value
      },() => {
          this.props.onDropdownSelect(this.state.show)
      })    
    }

    render() {
        return (
            <div id="header" className="bb-header">
              <div id="logo">
                Book Barn
              </div>
              <select id="countryDropdown" onChange={this.handleDropdownSelect} >
                {this.props.countryDropdown}
              </select>
            </div>
        )
      }
}

export default Header;