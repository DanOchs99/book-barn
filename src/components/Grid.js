import React, {Component} from 'react';
import './Grid.css';
import Thumbnail from './Thumbnail';

class Grid extends Component {
    render() {
        // catch the initial render before I load the books
        if (this.props.allBooks.length > 0) {
            let books = []
            if (this.props.show == "All") {
                books = this.props.allBooks;
            }
            else {
                books = this.props.allBooks.filter((book) => book.country==this.props.show);
            }
            const bookElements = books.map((book, index) => {
                return (
                    <div key={index}>
                      <Thumbnail book={book} />
                    </div>
                )
            });

            return (
                <div id="grid" className="bb-grid">
                  {bookElements}
                </div>
            )
        }
        else {
            return (<div></div>)    
        }
    }
}

export default Grid;