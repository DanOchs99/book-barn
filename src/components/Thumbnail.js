import React, {Component} from 'react';
import './Thumbnail.css';

class Thumbnail extends Component {
    render() {
        return (
            <div>
              <img src={this.props.book.imageSrc} alt={this.props.book.title} className="imageThumbnail" />
            </div>
        );
    }
}

export default Thumbnail;
