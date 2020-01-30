import React, {Component} from 'react';
import './Grid.css';
import Thumbnail from './Thumbnail';

class Grid extends Component {
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
        // catch the initial render before I load the books
        if (this.props.allBooks.length > 0) {
            let books = []
            if (this.props.show === "All") {
                books = this.props.allBooks;
            }
            else {
                books = this.props.allBooks.filter((book) => book.genre===this.props.show);
            }
            const bookElements = books.map((book, index) => {
                return (
                    <div key={index}>
                      <Thumbnail book={book} />
                    </div>
                )
            });

            return (
                <div>
                  <select id="genreDropdown" onChange={this.handleDropdownSelect} >
                    {this.props.genreDropdown}
                  </select>
                  <div id="grid" className="bb-grid">
                    {bookElements}
                  </div>
                </div>
            )
        }
        else {
            return (<div></div>)    
        }
    }
}

export default Grid;
