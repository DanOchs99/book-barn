import React from 'react';
import { Link } from 'react-router-dom';
import './Thumbnail.css';

const Thumbnail = (props) => {

const detailLink = `/book/${props.book.id}`
return (
       <Link to={detailLink} >
         <img src={props.book.imageurl} alt={props.book.title} className="imageThumbnail" />
       </Link>
       );
}

export default Thumbnail;
