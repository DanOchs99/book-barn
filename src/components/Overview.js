import React, { useState, useEffect } from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';

const Overview = (props) => {
    const [localBooks, setlocalBooks] = useState({ allBooks: [], genreDropdown: [] });

    useEffect(() => {
        // call the server and get all the books
        fetch('http://localhost:8080/books', {
            headers: {
                "authorization": props.token
            }
        })
        .then(response => { response.json()
            .then((books) => {
                // build the dropdown list of genres
                let allGenres = [];
                for (let i=0; i<books.length; i++) {
                    if (allGenres.filter(genre => genre===books[i].genre).length === 0) {
                        allGenres.push(books[i].genre)
                    }
                }
                const sortedGenres = ["All"].concat(allGenres.sort());
                const allGenreElements = sortedGenres.map((genre, index) => {
                    return (
                        <option key={index}>
                            {genre}
                        </option>
                    );
                })
                // set the state - initially show all the books
                setlocalBooks({allBooks: books, genreDropdown: allGenreElements, show: "All"});
            })
            .catch((error) => { console.log(error)
                                props.history.push('/');
            });
        })
        .catch((error) => { console.log(error)
                            props.history.push('/');
        });
    },[props.history, props.token])

    //const onDropdownSelect = (selection) => {
    //    setlocalBooks({show: selection});
    //}

    //return (
    //       <Grid allBooks={localBooks.allBooks} show={localBooks.show} genreDropdown={localBooks.genreDropdown} onDropdownSelect={onDropdownSelect} />
    //       );

    return (
           <Grid allBooks={localBooks.allBooks} genreDropdown={localBooks.genreDropdown} />
           );       
}

const mapStateToProps = (state) => {
    return { token: state.userR.token }
}

export default connect(mapStateToProps)(Overview);