import React, {Component} from 'react';
import './Detail.css';
import { connect } from 'react-redux';

class Detail extends Component {

    constructor(props) {
        super(props)
        this.state = {theBook: ''}
    }

    componentDidMount() {
        // call the server and get the book
        const detailurl = `http://localhost:8080/detail/${this.props.match.params.bookId}`
        
        //let token = sessionStorage.getItem('jwtToken');
        const token = this.props.token;

        fetch(detailurl, {
            headers: {
                "authorization": token
            }
        })
        .then(response => { response.json()
            .then((book) => {
                // set the state
                this.setState({theBook: book});
            })
            .catch((error) => { console.log(error)
                                this.props.history.push('/');
            });
        })
        .catch((error) => { console.log(error)
                            this.props.history.push('/');
        });
    }
    
    handleClickDelete = () => {

        //let token = sessionStorage.getItem('jwtToken');
        const token = this.props.token;

        fetch("http://localhost:8080/delete", {
            method: 'POST',  
            body: JSON.stringify({book: this.state.theBook.id }),
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            }
        })
        .then(() => {
            this.props.history.push('/');
        })
        .catch((error) => { console.log(error)
                            this.props.history.push('/');
        });
    }

    handleClickEdit = () => {
        const editurl = `/edit/${this.state.theBook.id}`
        this.props.history.push(editurl);
    }

    handleClickAdd = () => {
        this.props.onAddBookToCart();
    }

    render() {
        return (
            <div id="grid" className="bb-detail">
              <div>
                  <img src={this.state.theBook.imageurl} alt={this.state.theBook.title} className="bb-detail-image" />
              </div>
              <div className="bb-detail-info">
                <p>{this.state.theBook.title}</p>
                <p>{this.state.theBook.genre}</p>
                <p>{this.state.theBook.publisher}</p>
                <p>{this.state.theBook.year}</p>
                <button onClick={this.handleClickDelete} >Delete Book</button>
                <button onClick={this.handleClickEdit} >Edit Book</button>
                <button onClick={this.handleClickAdd} >Add to Cart</button>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { token: state.token }
}

const mapDispatchToProps = (dispatch) => {
    return { onAddBookToCart: () => dispatch({type: 'INCREMENT_CART'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)