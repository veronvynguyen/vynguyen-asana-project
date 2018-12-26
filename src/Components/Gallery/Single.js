import React, {Component} from 'react';
import Photo from '../Gallery/Photo';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Single extends Component {
    render() {
        const {match, posts} = this.props
        const id = Number(match.params.id)
        const post = posts.find((post) => post.id === id)
        const index = this.props.posts.findIndex((post) => post.id === id)
        if (this.props.loading === true) {
            return <div className="loader"> ...loading </div>
        } else if (post) {
           return <div
            className="modal"
            style={{
                position: "fixed",
                display: "flex",
                background: "#fff",
                top: 25,
                left: "10%",
                right: "10%",
                padding: 15,
                border: "2px solid #444"
            }}>
                    <Photo post={post} {...this.props} index={index}/>
                    <h3>{post.name}</h3>
                </div>
        } else {
            return <h1> ...no post found </h1>
        }
    }
}

export default Single