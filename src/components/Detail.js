import React, { useState, useEffect } from 'react';
import './Detail.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/cart'

const Detail = (props) => {

    const [theBook, setTheBook] = useState('');

    useEffect(() => {
        // call the server and get the book
        const detailurl = `http://localhost:8080/detail/${props.match.params.bookId}`

        fetch(detailurl, {
            headers: {
                "authorization": props.token
            }
        })
        .then(response => { response.json()
            .then((book) => {
                // set the state
                setTheBook(book);
            })
            .catch((error) => { console.log(error)
                                props.history.push('/');
            });
        })
        .catch((error) => { console.log(error)
                            props.history.push('/');
        });
    }, [props.history, props.match.params.bookId, props.token]);
    
    const handleClickDelete = () => {
        fetch("http://localhost:8080/delete", {
            method: 'POST',  
            body: JSON.stringify({book: theBook.id }),
            headers: {
                "Content-Type": "application/json",
                "authorization": props.token
            }
        })
        .then(() => {
            props.history.push('/');
        })
        .catch((error) => { console.log(error)
                            props.history.push('/');
        });
    }

    const handleClickEdit = () => {
        const editurl = `/edit/${theBook.id}`
        props.history.push(editurl);
    }

    const handleClickAdd = () => {
        props.onAddBookToCart();
    }

    return (
            <div id="grid" className="bb-detail">
              <div>
                  <img src={theBook.imageurl} alt={theBook.title} className="bb-detail-image" />
              </div>
              <div className="bb-detail-info">
                <p>{theBook.title}</p>
                <p>{theBook.genre}</p>
                <p>{theBook.publisher}</p>
                <p>{theBook.year}</p>
                <button onClick={handleClickDelete} >Delete Book</button>
                <button onClick={handleClickEdit} >Edit Book</button>
                <button onClick={handleClickAdd} >Add to Cart</button>
              </div>
            </div>
        );
}

const mapStateToProps = (state) => {
    return { token: state.userR.token }
}

const mapDispatchToProps = (dispatch) => {
    return { onAddBookToCart: () => dispatch(actionCreators.onIncrementCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)