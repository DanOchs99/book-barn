import React, {Component} from 'react';
import Grid from './Grid';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        // run the superclass constructor
        super(props);
        // set the initial state here
        
        this.state = { allBooks: [], genreDropdown: [], show: "All" }
    }

    componentDidMount() {
        // call the server and get all the books

        //let token = sessionStorage.getItem('jwtToken');
        const token = this.props.token;
        
        fetch('http://localhost:8080/books', {
            headers: {
                "authorization": token
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
                this.setState({allBooks: books, genreDropdown: allGenreElements, show: "All"});
            })
            .catch((error) => { console.log(error)
                                this.props.history.push('/');
            });
        })
        .catch((error) => { console.log(error)
                            this.props.history.push('/');
        });
    }

    // arrow function provides access to this.setState
    onDropdownSelect = (selection) => {
        this.setState({show: selection});
    }

    render() {
        return (
              <Grid allBooks={this.state.allBooks} show={this.state.show} genreDropdown={this.state.genreDropdown} onDropdownSelect={this.onDropdownSelect} />
        );
    }
}

const mapStateToProps = (state) => {
    return { token: state.token }
}

export default connect(mapStateToProps)(App);