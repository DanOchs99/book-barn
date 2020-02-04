import React, { useState } from 'react';
import './Grid.css';
import Thumbnail from './Thumbnail';

const Grid = (props) => {

    const [show, setShow] = useState('All')

    const handleDropdownSelect = (e) => {
        setShow(e.target.value)
        //props.onDropdownSelect(show)
    }

    // catch the initial render before I've loaded the books
    if (props.allBooks) {
        if (props.allBooks.length > 0) {
            let books = []
            if (show === "All") {
                books = props.allBooks;
            }
            else {
                books = props.allBooks.filter((book) => book.genre===show);
            }
            const bookElements = books.map((book, index) => {
                return (
                       <div key={index}>
                         <Thumbnail book={book} />
                       </div>
                       );
            });

            return (
                   <div>
                     <select id="genreDropdown" onChange={handleDropdownSelect} >
                       {props.genreDropdown}
                     </select>
                     <div id="grid" className="bb-grid">
                       {bookElements}
                     </div>
                   </div>
                   );
        }
        else {
            return (<div></div>)
        }
    }
    else {
        return (<div></div>)    
    }
}

export default Grid;
