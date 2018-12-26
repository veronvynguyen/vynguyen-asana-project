import React from 'react'
import Photo from './Photo'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-flexbox-grid';

function Gallery(props) {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            <div className="site-header">
                <h2><span>Asana</span> Dog Adoption Agency</h2>
                <blockquote class="site-header__quote">
                    <p>A dog will teach you unconditional love. If you can have that in your life, things won't be too bad.</p>
                    <cite>&mdash;Robert Wagner</cite>
                </blockquote>
            </div>
            <Row className="gallery">
                {props.posts.sort(function(x,y) {
                    return y.id - x.id
                }).map((post, index) => 
                    <Col xs>
                        {/* <div className="cell"> */}
                            <Photo key={index} post={post} {...props} index={index}/>
                        {/* </div> */}
                    </Col>
                )}
            </Row>
        </Grid >
    )
    
}

Gallery.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default Gallery