import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.css';

class Thumbnail extends Component {

    render() {
        const detailLink = `/book/${this.props.book.id}`
        return (
            <Link to={detailLink} >
              <img src={this.props.book.imageurl} alt={this.props.book.title} className="imageThumbnail" />
            </Link>
        );
    }
}

export default Thumbnail;
