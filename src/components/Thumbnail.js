import React, {Component} from 'react';
import './Thumbnail.css';

class Thumbnail extends Component {

    render() {
        const detailurl = `http://localhost:3000/book/${this.props.book.id}`
        return (
            <a href={detailurl} >
              <img src={this.props.book.imageurl} alt={this.props.book.title} className="imageThumbnail" />
            </a>
        );
    }
}

export default Thumbnail;
