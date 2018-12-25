import React from 'react'
import Photo from './Photo'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid';
// import { ModalContainer, ModalRoute } from 'react-router-modal';
// import { BrowserRouter, Link } from 'react-router-dom';
import Single from './Single';
// import "../styles/modal.css";
import Gallery from 'react-grid-gallery';
import { render } from 'react-dom';

function AsanaGallery(props) {

    const IMAGES = [];
    console.clear();
   // console.log(props.posts);   
    {props.posts.sort(function(x,y) {
        return y.id - x.id
     }).map((post, index) => {
        IMAGES.push(
            {
                src: post.imageLink,
                thumbnail: post.imageLink,
                thumbnailWidth: 320,
                thumbnailHeight: 174,
                isSelected: true,
                caption: post.description
            });
    })};


    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                <div className="site-header">
                    <h2>Asana Dog Adoption Agency</h2>
                    <blockquote class="site-header__quote">
                        <p>A dog will teach you unconditional love. If you can have that in your life, things won't be too bad.</p>
                        <cite>&mdash;Robert Wagner</cite>
                    </blockquote>
                </div>
                {/* <Row className="gallery">
                    <Link className="addIcon" to="/Admin/AddPhoto"> Create a listing </Link> 
                </Row> */}
            </Grid >
            <Gallery images={IMAGES}/>
     </div>
    )
    
}

AsanaGallery.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default AsanaGallery