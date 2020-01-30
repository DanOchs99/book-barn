import React, {Component} from 'react';
import './Edit.css';

class Edit extends Component {

    constructor(props) {
        super(props)
        this.state = {theBook: {id: 0, title: '', genre: '', publisher: '', year: 0, imageurl: ''}}
    }

    componentDidMount() {
        // call the server and get the book
        if (this.props.match.params.bookId > 0) {
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
    }
    
    handleClickSubmit = () => {
        const detailurl = `http://localhost:8080/edit/${this.state.theBook.id}`
        fetch(detailurl, {
            method: 'POST',  
            body: JSON.stringify({book: this.state.theBook }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            this.props.history.push('/');
        })
        .catch((error) => console.log(error));
    }

    handleEdit = (e) => {
        let update = this.state.theBook
        update[e.target.id] = e.target.value;
        this.setState({theBook: update})
    }

    render() {
        return (
            <div id="grid" className="bb-detail">
              <div>
                  <img src={this.state.theBook.imageurl} alt={this.state.theBook.title} className="bb-detail-image" />
              </div>
              <div className="bb-detail-info">
                <input type="text" id="title" placeholder="title" value={this.state.theBook.title} onChange={this.handleEdit}/>
                <input type="text" id="genre" placeholder="genre" value={this.state.theBook.genre} onChange={this.handleEdit}/>
                <input type="text" id="publisher" placeholder="publisher" value={this.state.theBook.publisher} onChange={this.handleEdit}/>
                <input type="text" id="year" placeholder="year" value={this.state.theBook.year} onChange={this.handleEdit}/>
                <input type="text" id="imageurl" placeholder="imageurl" value={this.state.theBook.imageurl} onChange={this.handleEdit}/>
                <button onClick={this.handleClickSubmit} >Submit</button>
              </div>
            </div>
        );
    }
}

export default Edit;