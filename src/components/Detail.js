import React, {Component} from 'react';
import './Detail.css';

class Detail extends Component {

    constructor(props) {
        super(props)
        this.state = {theBook: ''}
    }

    componentDidMount() {
        // call the server and get the book
        const detailurl = `http://localhost:8080/detail/${this.props.match.params.bookId}`
        fetch(detailurl)
        .then(response => { response.json()
            .then((book) => {
                // set the state
                this.setState({theBook: book});
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
    
    handleClickDelete = () => {
        console.log(`Delete request for book id: ${this.state.theBook.id}`)
    }

    render() {
        return (
            <div>
              <h1>This is a detail page.</h1>
              <p>Book number {this.props.match.params.bookId}</p>
              <p>{this.state.theBook.title}</p>
              <p>{this.state.theBook.genre}</p>
              <p>{this.state.theBook.publisher}</p>
              <p>{this.state.theBook.year}</p>
              <p>{this.state.theBook.imageurl}</p>
              <button onClick={this.handleClickDelete} >Delete Book</button>
            </div>
        );
    }
}

export default Detail;