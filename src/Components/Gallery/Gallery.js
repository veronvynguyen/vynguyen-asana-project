import React from 'react'
import Photo from './Photo'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-flexbox-grid';
<<<<<<< HEAD
import { Link } from 'react-router-dom';

function Gallery(props) {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            <div className="site-header">
                <Link to="/"><h2>Hall of Paws</h2></Link>
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
=======

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
                        <Col md>
                            <div className="cell">
                                <Photo key={index} post={post} {...props} index={index}/>
                            </div>
                        </Col>
                    )}
                </Row>
            </Grid >
>>>>>>> e93b788283faba97992a1e303afee26c6958798e
    )
    
}

Gallery.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default Gallery