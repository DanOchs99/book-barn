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
        console.log(`Detail.js: delete request for book id: ${this.state.theBook.id}`)
        const detailurl = `http://localhost:8080/delete/${this.state.theBook.id}`
        fetch(detailurl, {
            method: 'POST',  
            body: JSON.stringify({book: this.state.theBook.id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            this.props.history.push('/');
        })
        .catch((error) => console.log(error));
    }

    render() {
        return (
            <div id="grid" className="bb-detail">
              <div>
                  <img src={this.state.theBook.imageurl} className="bb-detail-image" />
              </div>
              <div className="bb-detail-info">
                <p>{this.state.theBook.title}</p>
                <p>{this.state.theBook.genre}</p>
                <p>{this.state.theBook.publisher}</p>
                <p>{this.state.theBook.year}</p>
                <button onClick={this.handleClickDelete} >Delete Book</button>
                <button onClick={this.handleClickEdit} >Edit Book</button>
              </div>
            </div>
        );
    }
}

export default Detail;