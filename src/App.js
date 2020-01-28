import React, {Component} from 'react';
import Header from './components/Header';
import Grid from './components/Grid';

class App extends Component {
    constructor(props) {
        // run the superclass constructor
        super(props);
        // set the initial state here
        this.state = { allBooks: [], show: "All" }
    }
    
    componentDidMount() {
        // App added to the virtual DOM - get all the books
        fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
        .then(response => response.json())
        .then((json) => {
            // create the complete links to get cover images
            for (let i=0; i<json.length; i++) {
                json[i].imageSrc = `https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${json[i].imageLink}`
            }
            // set the state - initially show all the books
            this.setState({allBooks: json, show: "All"})
        });
    }

    render() {
        return (
            <>
              <Header />
              <Grid allBooks={this.state.allBooks} show={this.state.show} />
            </>
        );
    }
}

export default App;


/*

const allBooks = this.state.allBooks.map((book, index) => {
            let imageSrc = `https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`
            return (
                <li key={index}>
                    <img src={imageSrc} alt={book.title}/>
                </li>
            )
        });

        let allCountries = [];
        for (let i=0; i<this.state.allBooks.length; i++) {
            if (allCountries.filter(country => country===this.state.allBooks[i].country).length === 0) {
                allCountries.push(this.state.allBooks[i].country)
            }
        }

        const allCountryElements = allCountries.map((country, index) => {
            return (
                <li key={index}>
                  {country}
                </li>
            )
        });

*/