import React, { useState, useEffect } from 'react';
import './Edit.css';
import {connect} from 'react-redux';

const Edit = (props) => {

    const [theBook, setTheBook] = useState({id: 0, title: '', genre: '', publisher: '', year: 0, imageurl: ''});
    
    useEffect(() => {
        // call the server and get the book
        if (props.match.params.bookId > 0) {
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
                .catch((error) => { console.log(error);
                                    props.history.push('/');
                });
            })
            .catch((error) => { console.log(error)
                                props.history.push('/');
            });
        }
    }, [props.history, props.match.params.bookId, props.token]);
    
    const handleClickSubmit = () => {
        const detailurl = `http://localhost:8080/edit/${theBook.id}`

        fetch(detailurl, {
            method: 'POST',  
            body: JSON.stringify({book: theBook }),
            headers: {
                "Content-Type": "application/json",
                "authorization": props.token
            }
        })
        .then(() => {
            props.history.push('/books');
        })
        .catch((error) => { console.log(error)
                            props.history.push('/');
        });
    }

    const handleEdit = (e) => {
        let update = theBook
        update[e.target.id] = e.target.value;
        setTheBook(update)
    }

    return (
            <div id="grid" className="bb-detail">
              <div>
                  <img src={theBook.imageurl} alt={theBook.title} className="bb-detail-image" />
              </div>
              <div className="bb-detail-info">
                <input type="text" id="title" placeholder="title" value={theBook.title} onChange={handleEdit}/>
                <input type="text" id="genre" placeholder="genre" value={theBook.genre} onChange={handleEdit}/>
                <input type="text" id="publisher" placeholder="publisher" value={theBook.publisher} onChange={handleEdit}/>
                <input type="text" id="year" placeholder="year" value={theBook.year} onChange={handleEdit}/>
                <input type="text" id="imageurl" placeholder="imageurl" value={theBook.imageurl} onChange={handleEdit}/>
                <button onClick={handleClickSubmit} >Submit</button>
              </div>
            </div>
        );
}

const mapStateToProps = (state) => {
    return { token: state.userR.token }
}

export default connect(mapStateToProps)(Edit);